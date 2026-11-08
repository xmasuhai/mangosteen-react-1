import {
  getDragTranslateY,
  getNearestDateTimeIndex,
  getResistedTranslateY,
} from './dateTimeColumnMotion'

interface GestureStart {
  pointerY: number
  translateY: number
}

interface SettlingTarget {
  index: number
  itemHeight: number
  listLength: number
}

export interface DateTimeColumnMotionState {
  gesture: GestureStart | null
  settlingTarget: SettlingTarget | null
  observedIndex: number | null
}

interface AnimationUpdate {
  y: number
  config?: { tension: number; friction: number }
  onRest?: () => void
}

interface MotionControllerOptions {
  getState: () => DateTimeColumnMotionState
  currentDateIndex: number
  dateItemHeight: number
  dateTimeList: string[]
  onChange: (value: string) => void
  animation: {
    get: () => number
    stop: () => void
    set: (translateY: number) => void
    start: (update: AnimationUpdate) => void
  }
}

/** 状态由钩子持久保存；每次渲染创建控制器，以读取最新的列表和回调。 */
export const createDateTimeColumnMotionController = ({
  getState,
  currentDateIndex,
  dateItemHeight,
  dateTimeList,
  onChange,
  animation,
}: MotionControllerOptions) => {
  const syncSelection = () => {
    const state = getState()
    // 沿用原组件的同步时机；索引未变时，重渲染和尺寸变化都不主动对齐。
    if (state.observedIndex === currentDateIndex) {
      return
    }
    state.observedIndex = currentDateIndex
    if (state.gesture) {
      return
    }
    const target = state.settlingTarget
    if (target) {
      if (
        target.index === currentDateIndex &&
        target.itemHeight === dateItemHeight &&
        target.listLength === dateTimeList.length
      ) {
        return
      }
      state.settlingTarget = null
    }
    animation.start({ y: currentDateIndex * -dateItemHeight })
  }

  const startDrag = (pointerY: number) => {
    const state = getState()
    state.settlingTarget = null
    animation.stop()
    const translateY = animation.get()
    animation.set(translateY)
    state.gesture = { pointerY, translateY }
  }

  const drag = (pointerY: number) => {
    const gesture = getState().gesture
    if (!gesture) {
      return
    }
    const translateY = getDragTranslateY(gesture.translateY, gesture.pointerY, pointerY)
    animation.set(getResistedTranslateY(translateY, dateTimeList.length, dateItemHeight))
  }

  const endDrag = () => {
    const state = getState()
    if (!state.gesture) {
      return
    }
    state.gesture = null
    const resultIndex = getNearestDateTimeIndex(
      animation.get(),
      dateTimeList.length,
      dateItemHeight
    )
    const target = {
      index: resultIndex,
      itemHeight: dateItemHeight,
      listLength: dateTimeList.length,
    }
    state.settlingTarget = target
    animation.start({
      y: resultIndex * -dateItemHeight,
      config: { tension: 300, friction: 18 },
      onRest: () => {
        // 被新手势中断的旧动画，不能清除新一轮吸附的目标。
        if (state.settlingTarget === target) {
          state.settlingTarget = null
        }
      },
    })
    onChange(dateTimeList[resultIndex])
  }

  const cancelDrag = () => {
    const state = getState()
    if (!state.gesture) {
      return
    }
    state.gesture = null
    animation.start({ y: currentDateIndex * -dateItemHeight })
  }

  return { syncSelection, startDrag, drag, endDrag, cancelDrag }
}
