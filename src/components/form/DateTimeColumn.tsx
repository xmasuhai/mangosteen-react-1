import { DateTimeParts, DateTimeUnit } from '@/lib/helpers/DateTime'
import { animated, useSpring } from '@react-spring/web'
import { cn } from 'cn'
import { TouchEventHandler, useState } from 'react'

interface ColumnProps {
  className?: string
  dateTime: DateTimeParts
  dateItemHeight?: number
  dateTimeList: string[]
  datetimeUnit: DateTimeUnit
}

export const DateTimeColumn: React.FC<ColumnProps> = ({
  className,
  dateTime,
  dateItemHeight = 36,
  dateTimeList,
  datetimeUnit,
}) => {
  const halfDateItemHeight = dateItemHeight / 2
  const itemHeightVarStyle = {
    '--date-item-height': `${dateItemHeight}px`,
    '--half-date-item-height': `${halfDateItemHeight}px`,
    '--total-height': `${dateTimeList.length * dateItemHeight}px`,
  }

  const currentDateIndex = dateTimeList.indexOf(dateTime[datetimeUnit].toString())

  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, setTranslateYState] = useState(currentDateIndex * -dateItemHeight)

  const springStyle = useSpring({
    transform: `translate3d(0, ${translateY}px, 0)`,
    immediate: isTouching,
    config: {
      tension: 300,
      friction: 30,
    },
  })

  const setTranslateY = (y: number) => {
    y = Math.min(0, y)
    y = Math.max(y, (dateTimeList.length - 1) * -dateItemHeight)
    setTranslateYState(y)
  }

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    setIsTouching(true)
    setLastY(e.touches[0].clientY)
  }

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (!isTouching) {
      return
    }
    const currentY = e.touches[0].clientY
    const deltaY = currentY - lastY
    setTranslateY(translateY + deltaY)
    setLastY(currentY)
  }

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (/* e */) => {
    const remainder = translateY % dateItemHeight
    let resultY = translateY - remainder
    if (Math.abs(remainder) > halfDateItemHeight) {
      resultY += dateItemHeight * (remainder > 0 ? 1 : -1)
    }
    setTranslateY(resultY)
    setIsTouching(false)
  }
  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={itemHeightVarStyle}
      className={cn(
        'date-picker-wrapper h-[var(--total-height)] overflow-clip relative',
        className
      )}>
      {/*
      <div
        className={cn(
          'highlight-select-box h-[var(--date-item-height)] w-full',
          'absolute top-[calc(50%-var(--half-date-item-height))] left-0',
          'b-t-1.5 b-b-1.5 b-solid b-[#ccc]/50'
        )}></div>
         */}
      <div className="picker-positioner w-full absolute top-[calc(50%-var(--half-date-item-height))]">
        <animated.ol style={springStyle} className="year-picker text-center">
          {dateTimeList.map((dateStr) => (
            <li
              key={dateStr}
              className="h-[var(--date-item-height)] leading-[var(--date-item-height)]">
              {dateStr}
            </li>
          ))}
        </animated.ol>
      </div>
    </div>
  )
}
