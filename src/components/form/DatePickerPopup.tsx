import { createDateTime } from '@/lib/helpers/DateTime'
import { cn } from 'cn'
import { TouchEventHandler, useState } from 'react'

interface Props {
  className?: string
  start?: Date
  end?: Date
  value?: Date
  dateItemHeight?: number
}

export const DatePickerPopup: React.FC<Props> = ({
  className,
  start,
  end,
  value,
  dateItemHeight = 36,
}) => {
  const startTime = start ? createDateTime(start) : createDateTime().add(-3, 'year')
  const endTime = end ? createDateTime(end) : createDateTime().add(3, 'year')
  if (startTime.getTimestamp() >= endTime.getTimestamp()) {
    throw new Error('startTime must be greater than endTime')
  }

  const valueTime = value ? createDateTime(value) : createDateTime()
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 }).map(
    (_, i) => startTime.year + i
  )
  const halfDateItemHeight = dateItemHeight / 2
  const itemHeightVarStyle = {
    '--date-item-height': `${dateItemHeight}px`,
    '--half-date-item-height': `${halfDateItemHeight}px`,
    '--total-height': `${yearList.length * dateItemHeight}px`,
  }
  const currentYearIndex = yearList.indexOf(valueTime.year)

  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, _setTranslateY] = useState(currentYearIndex * -dateItemHeight)

  const setTranslateY = (y: number) => {
    y = Math.min(0, y)
    y = Math.max(y, (yearList.length - 1) * -dateItemHeight)
    _setTranslateY(y)
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
      <div
        className={cn(
          'highlight-select-box h-[var(--date-item-height)] w-full',
          'absolute top-[calc(50%-var(--half-date-item-height))] left-0',
          'border b-solid b-red'
        )}></div>
      <div className="picker-positioner w-full absolute top-[calc(50%-var(--half-date-item-height))]">
        <ol
          style={{ transform: `translateY(${translateY}px)` }}
          className="year-picker text-center">
          {yearList.map((year) => (
            <li
              key={year}
              className="h-[var(--date-item-height)] leading-[var(--date-item-height)]">
              {year}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
