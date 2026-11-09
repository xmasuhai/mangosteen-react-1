import { useSpring, type SpringValue, type SpringRef } from '@react-spring/web'
import { useEffect, useRef, } from 'react'
import type { MutableRefObject, TouchEventHandler } from 'react'
import {
  getDragTranslateY,
  getNearestDateTimeIndex,
  getResistedTranslateY,
} from './dateTimeColumnMotion'

interface ColumnMotionOptions {
  /** 单行高度（像素），用于索引与位移之间的换算。 */
  dateItemHeight: number
  /** 受控选中值，必须存在于 dateTimeList 中，否则 Hook 会抛错。 */
  dateTimeValue: string
  /** 按列中显示顺序排列的可选值。 */
  dateTimeList: string[]
  /** 通知父组件更新受控选中值。 */
  onChange: (value: string) => void
}

/** 手势起点快照，后续移动以此为基准计算位移。 */
interface GestureStart {
  /** 起始触点在视口中的纵坐标。 */
  pointerY: number
  /** 手势开始时列的可见位移，可能处于动画中途。 */
  translateY: number
}

/** 本次吸附的目标及布局快照，用于判断受控值回传是否仍对应同一次吸附。 */
interface SettlingTarget {
  index: number
  itemHeight: number
  listLength: number
}

interface TouchStart {
  e: TouchEventHandler<HTMLDivElement>,
  gestureRef: MutableRefObject<GestureStart | null>,
  settlingTargetRef: MutableRefObject<SettlingTarget | null>
  springApi: SpringRef<{ y: number }>
  springs: { y: SpringValue<number> }
}

interface TouchMove {
  e: TouchEventHandler<HTMLDivElement>
  gestureRef: MutableRefObject<GestureStart | null>
  springApi: SpringRef<{ y: number }>
  dateTimeList: string[]
  dateItemHeight: number
}

interface TouchEnd {
  gestureRef: MutableRefObject<GestureStart | null>
  settlingTargetRef: MutableRefObject<SettlingTarget | null>
  dateTimeList: string[]
  dateItemHeight: number
  springs: { y: SpringValue<number> }
  springApi: SpringRef<{ y: number }>
  onChange: (value: string) => void
}

interface TouchCancel {
  gestureRef: MutableRefObject<GestureStart | null>
  springApi: SpringRef<{ y: number }>
  currentDateIndex: number,
  dateItemHeight: number,
}

// 只取首个触点；没有触点则不建立手势
const useTouchStart = (
  {
    e,
    settlingTargetRef,
    springApi,
    springs,
    gestureRef,
  }: TouchStart
) => {
  const touch = e.touches[0]
  if (!touch) {
    return
  }

  // 清除旧吸附目标并停止动画，从当前可见位移接续拖动，避免跳回旧目标。
  settlingTargetRef.current = null
  springApi.stop()
  const translateY = springs.y.get()
  springApi.set({ y: translateY })
  gestureRef.current = { pointerY: touch.clientY, translateY, }
}

// 先从手势起点计算原始位移，再施加越界阻尼，避免累计阻尼导致回拖失真。
const useTouchMove = (
  {
    e,
    gestureRef,
    springApi,
    dateTimeList,
    dateItemHeight,
  }: TouchMove
) => {
  const gesture = gestureRef.current
  const touch = e.touches[0]
  if (!gesture || !touch) {
    // 缺少有效起点或当前触点时，不更新位移。
    return
  }

  const translateY = getDragTranslateY(gesture.translateY, gesture.pointerY, touch.clientY)
  // set 直接更新可见位移以保持跟手，不在拖动中启动弹簧动画。
  springApi.set({
    y: getResistedTranslateY(translateY, dateTimeList.length, dateItemHeight),
  })
}

// 按当前可见位移选取最近合法项，并启动吸附动画
const useTouchEnd = (
  {
    springs,
    springApi,
    gestureRef,
    settlingTargetRef,
    dateTimeList,
    dateItemHeight,
    onChange,
  }: TouchEnd
) => {
  if (!gestureRef.current) {
    // 忽略未开始或已结束的手势，避免重复吸附和通知。
    return
  }

  // 先释放拖动状态，让后续受控值同步能识别本次吸附目标。
  gestureRef.current = null
  const resultIndex = getNearestDateTimeIndex(
    springs.y.get(),
    dateTimeList.length,
    dateItemHeight
  )
  const settlingTarget = {
    index: resultIndex,
    itemHeight: dateItemHeight,
    listLength: dateTimeList.length,
  }
  settlingTargetRef.current = settlingTarget
  springApi.start({
    y: resultIndex * -dateItemHeight,
    config: { tension: 300, friction: 18 },
    onRest: () => {
      // 动画停止时仅清除同一对象代表的目标，避免旧回调抹掉较新的吸附目标。
      if (settlingTargetRef.current === settlingTarget) {
        settlingTargetRef.current = null
      }
    },
  })
  // 启动动画后立即通知父组件更新选中值，不等待动画完成。
  onChange(dateTimeList[resultIndex])
}

// 清空当前受控选中项
const useTouchCancel = (
  {
    gestureRef,
    springApi,
    currentDateIndex,
    dateItemHeight,
  }: TouchCancel
) => {
  if (!gestureRef.current) {
    return
  }

  gestureRef.current = null
  springApi.start({ y: currentDateIndex * -dateItemHeight })
}


/**
 * 管理日期列的手势、弹簧动画和受控选中值同步，要求选中值存在于可选列表中。
 * DateTimeColumn.tsx 将返回的 translateYSpringValue 用于列表的纵向 transform，
 * 并把 touchHandlers 绑定到列容器，使触摸交互与动画使用同一份位移。
 */
export const useDateTimeColumnMotion = ({
  dateItemHeight,
  dateTimeValue,
  dateTimeList,
  onChange,
}: ColumnMotionOptions) => {
  const currentDateIndex = dateTimeList.indexOf(dateTimeValue)
  if (currentDateIndex === -1) {
    throw new Error('dateTimeValue is not in dateTimeList')
  }

  // 跨渲染保存手势起点；非空时表示正在拖动，外部同步不应接管位移。
  const gestureRef = useRef<GestureStart | null>(null)
  // 跨渲染追踪本次吸附目标，避免父组件回传选中值时重复启动同一动画。
  const settlingTargetRef = useRef<SettlingTarget | null>(null)
  // 以「-选中索引 × 行高」初始化弹簧，让选中行落在视图的选择位置；后续由 API 更新。
  const [springs, springApi] = useSpring(() => ({
    y: currentDateIndex * -dateItemHeight,
    config: { tension: 300, friction: 30 },
  }))

  // 首次挂载及选中索引变化时同步；行高或列表长度单独变化不会触发此副作用。
  useEffect(() => {
    if (gestureRef.current) {
      // 拖动期间保留手指对位移的控制，避免外部值更新造成跳动。
      return
    }
    const settlingTarget = settlingTargetRef.current
    if (settlingTarget) {
      if (
        settlingTarget.index === currentDateIndex &&
        settlingTarget.itemHeight === dateItemHeight &&
        settlingTarget.listLength === dateTimeList.length
      ) {
        // 回传值与吸附目标及布局一致，沿用正在进行的动画。
        return
      }
      // 受控选中项或布局已不匹配，旧吸附目标不再适用。
      settlingTargetRef.current = null
    }
    // 没有可沿用的吸附目标时，按当前受控选中项重新对齐。
    springApi.start({ y: currentDateIndex * -dateItemHeight })
  }, [currentDateIndex /* dateItemHeight, dateTimeList.length, springApi */])

  // 触摸开始时只取首个触点；没有触点则不建立手势。
  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    useTouchStart({
      e,
      settlingTargetRef,
      springApi,
      springs,
      gestureRef,
    })
  }
  // 移动时先从手势起点计算原始位移，再施加越界阻尼，避免累计阻尼导致回拖失真。
  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    useTouchMove({
      e,
      gestureRef,
      springApi,
      dateTimeList,
      dateItemHeight,
    })
  }
  // 松手后按当前可见位移选取最近合法项，并启动吸附动画。
  const onTouchEnd: TouchEventHandler<HTMLDivElement> = () => {
    useTouchEnd({
      springs,
      springApi,
      gestureRef,
      settlingTargetRef,
      dateTimeList,
      dateItemHeight,
      onChange,
    })
  }
  // 取消时清空当前受控选中项，不调用 onChange 提交拖动结果。
  const onTouchCancel: TouchEventHandler<HTMLDivElement> = () => {
    useTouchCancel({
      gestureRef,
      springApi,
      currentDateIndex,
      dateItemHeight,
    })
  }

  return {
    translateYSpringValue: springs.y,
    touchHandlers: { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel },
  }
}
