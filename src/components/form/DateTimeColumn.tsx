import { animated, useSpring } from '@react-spring/web'
import { cn } from 'cn'
import { useEffect, useRef } from 'react'
import type { TouchEventHandler } from 'react'
import {
  getDragTranslateY,
  getNearestDateTimeIndex,
  getResistedTranslateY,
} from './dateTimeColumnMotion'

interface ColumnProps {
  className?: string
  dateItemHeight?: number
  dateTimeValue: string
  dateTimeList: string[]
  onChange: (value: string) => void
}

export const DateTimeColumn: React.FC<ColumnProps> = ({
  className,
  dateItemHeight = 36,
  dateTimeValue,
  dateTimeList,
  onChange,
}) => {
  const halfDateItemHeight = dateItemHeight / 2
  const itemHeightVarStyle = {
    '--date-item-height': `${dateItemHeight}px`,
    '--half-date-item-height': `${halfDateItemHeight}px`,
    touchAction: 'none',
  }

  const currentDateIndex = dateTimeList.indexOf(dateTimeValue)
  if (currentDateIndex === -1) {
    throw new Error('dateTimeValue is not in dateTimeList')
  }

  const gestureRef = useRef<{ pointerY: number; translateY: number } | null>(null)
  const settlingTargetRef = useRef<{
    index: number
    itemHeight: number
    listLength: number
  } | null>(null)
  const [springs, springApi] = useSpring(() => ({
    y: currentDateIndex * -dateItemHeight,
    config: { tension: 300, friction: 30 },
  }))

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
  }, [currentDateIndex, dateItemHeight, dateTimeList.length, springApi])

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

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      style={itemHeightVarStyle}
      className={cn(
        'date-picker-column h-[var(--popup-height)] overflow-clip relative',
        className
      )}>
      <div className="picker-positioner w-full absolute top-[calc(50%-var(--half-date-item-height))]">
        <animated.ol
          style={{ transform: springs.y.to((y) => `translate3d(0, ${y}px, 0)`) }}
          className="date-time-picker text-center">
          {dateTimeList.map((dateTimeStr) => (
            <li
              key={dateTimeStr}
              className="h-[var(--date-item-height)] leading-[var(--date-item-height)]">
              {dateTimeStr}
            </li>
          ))}
        </animated.ol>
      </div>
    </div>
  )
}
