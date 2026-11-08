import { useSpring } from '@react-spring/web'
import { useEffect, useRef } from 'react'
import type { TouchEventHandler } from 'react'
import {
  createDateTimeColumnMotionController,
  type DateTimeColumnMotionState,
} from './dateTimeColumnMotionController'

interface ColumnMotionOptions {
  dateItemHeight: number
  dateTimeValue: string
  dateTimeList: string[]
  onChange: (value: string) => void
}

const withFirstTouch = (handle: (pointerY: number) => void): TouchEventHandler<HTMLDivElement> => {
  return (event) => {
    const touch = event.touches[0]
    if (touch) {
      handle(touch.clientY)
    }
  }
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

  const motionStateRef = useRef<DateTimeColumnMotionState>({
    gesture: null,
    settlingTarget: null,
    observedIndex: null,
  })
  const [springs, springApi] = useSpring(() => ({
    y: currentDateIndex * -dateItemHeight,
    config: { tension: 300, friction: 30 },
  }))

  const motion = createDateTimeColumnMotionController({
    getState: () => motionStateRef.current,
    currentDateIndex,
    dateItemHeight,
    dateTimeList,
    onChange,
    animation: {
      get: () => springs.y.get(),
      stop: () => springApi.stop(),
      set: (y) => springApi.set({ y }),
      start: (update) => springApi.start(update),
    },
  })

  useEffect(() => {
    motion.syncSelection()
  }, [motion])

  return {
    translateY: springs.y,
    touchHandlers: {
      onTouchStart: withFirstTouch(motion.startDrag),
      onTouchMove: withFirstTouch(motion.drag),
      onTouchEnd: motion.endDrag,
      onTouchCancel: motion.cancelDrag,
    },
  }
}
