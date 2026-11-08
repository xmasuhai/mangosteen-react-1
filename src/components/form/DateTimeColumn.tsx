import { animated, useSpring } from '@react-spring/web'
import { cn } from 'cn'
import { TouchEventHandler, useEffect, useState } from 'react'

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
  }

  const currentDateIndex = dateTimeList.indexOf(dateTimeValue)
  if (currentDateIndex === -1) {
    throw new Error('dateTimeValue is not in dateTimeList')
  }

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

  useEffect(() => {
    const currentDateIndex = dateTimeList.indexOf(dateTimeValue)
    setTranslateY(currentDateIndex * -dateItemHeight)
  }, [dateTimeValue])

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
    onChange(dateTimeList[Math.abs(resultY / dateItemHeight)])
  }

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={itemHeightVarStyle}
      className={cn(
        'date-picker-column h-[var(--popup-height)] overflow-clip relative',
        className
      )}>
      <div className="picker-positioner w-full absolute top-[calc(50%-var(--half-date-item-height))]">
        <animated.ol style={springStyle} className="date-time-picker text-center">
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
