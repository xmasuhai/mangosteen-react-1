import { useSpring } from '@react-spring/web'
import { useEffect, useRef } from 'react'
import type { TouchEventHandler } from 'react'
import {
  getDragTranslateY,
  getNearestDateTimeIndex,
  getResistedTranslateY,
} from './dateTimeColumnMotion'

interface ColumnMotionOptions {
  dateItemHeight: number
  dateTimeValue: string
  dateTimeList: string[]
  onChange: (value: string) => void
}

interface GestureStart {
  pointerY: number
  translateY: number
}

interface SettlingTarget {
  index: number
  itemHeight: number
  listLength: number
}

/** 管理日期列的手势、弹簧动画和选中值同步，向视图提供位移与触摸事件。 */
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

  const gestureRef = useRef<GestureStart | null>(null)
  const settlingTargetRef = useRef<SettlingTarget | null>(null)
  const [springs, springApi] = useSpring(() => ({
    y: currentDateIndex * -dateItemHeight,
    config: { tension: 300, friction: 30 },
  }))

  // 沿用原组件的同步时机，仅在选中索引变化时重新对齐。
  useEffect(() => {
    if (gestureRef.current) {
      return
    }
    const settlingTarget = settlingTargetRef.current
    if (settlingTarget) {
      if (
        settlingTarget.index === currentDateIndex &&
        settlingTarget.itemHeight === dateItemHeight &&
        settlingTarget.listLength === dateTimeList.length
      ) {
        return
      }
      settlingTargetRef.current = null
    }
    springApi.start({ y: currentDateIndex * -dateItemHeight })
  }, [currentDateIndex /* dateItemHeight, dateTimeList.length, springApi */])

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    const touch = e.touches[0]
    if (!touch) {
      return
    }

    settlingTargetRef.current = null
    springApi.stop()
    const translateY = springs.y.get()
    springApi.set({ y: translateY })
    gestureRef.current = { pointerY: touch.clientY, translateY }
  }

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const gesture = gestureRef.current
    const touch = e.touches[0]
    if (!gesture || !touch) {
      return
    }

    const translateY = getDragTranslateY(gesture.translateY, gesture.pointerY, touch.clientY)
    springApi.set({
      y: getResistedTranslateY(translateY, dateTimeList.length, dateItemHeight),
    })
  }

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = () => {
    if (!gestureRef.current) {
      return
    }

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
        if (settlingTargetRef.current === settlingTarget) {
          settlingTargetRef.current = null
        }
      },
    })
    onChange(dateTimeList[resultIndex])
  }

  const onTouchCancel: TouchEventHandler<HTMLDivElement> = () => {
    if (!gestureRef.current) {
      return
    }

    gestureRef.current = null
    springApi.start({ y: currentDateIndex * -dateItemHeight })
  }

  return {
    translateY: springs.y,
    touchHandlers: { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel },
  }
}
