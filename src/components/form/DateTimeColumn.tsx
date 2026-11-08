import { animated } from '@react-spring/web'
import { cn } from 'cn'
import { useDateTimeColumnMotion } from './useDateTimeColumnMotion'

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
  const { translateYSpringValue, touchHandlers } = useDateTimeColumnMotion({
    dateItemHeight,
    dateTimeValue,
    dateTimeList,
    onChange,
  })
  const halfDateItemHeight = dateItemHeight / 2
  const itemHeightVarStyle = {
    '--date-item-height': `${dateItemHeight}px`,
    '--half-date-item-height': `${halfDateItemHeight}px`,
    touchAction: 'none',
  }

  return (
    <div
      {...touchHandlers}
      style={itemHeightVarStyle}
      className={cn(
        'date-picker-column h-[var(--popup-height)] overflow-clip relative',
        className
      )}>
      <div className="picker-positioner w-full absolute top-[calc(50%-var(--half-date-item-height))]">
        <animated.ol
          style={{ transform: translateYSpringValue.to((y) => `translate3d(0, ${y}px, 0)`) }}
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
