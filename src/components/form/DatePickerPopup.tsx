import { cn } from 'cn'
import { DateTimeColumn } from '@/components/form/DateTimeColumn'

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
  return (
    <div className={cn(className, 'flex relative')}>
      <DateTimeColumn
        className="grow-1"
        start={start}
        end={end}
        value={value}
        dateItemHeight={dateItemHeight}
      />
      <DateTimeColumn
        className="grow-1"
        start={start}
        end={end}
        value={value}
        dateItemHeight={dateItemHeight}
      />
      <DateTimeColumn
        className="grow-1"
        start={start}
        end={end}
        value={value}
        dateItemHeight={dateItemHeight}
      />
      <div
        className={cn(
          'picker-mask z-1 pointer-events-none w-full h-full',
          'absolute top-0 left-1em right-1em transform-gpu',
          'bg-[image:var(--picker-mask-color)] bg-no-repeat',
          'bg-[position:center_top,center_bottom] bg-[size:100%_110px]'
        )}></div>
      <div
        className={cn(
          'pricker-frame z-2 h-[36px] pointer-events-none',
          'absolute top-[50%] left-[1em] right-[1em] translate-y-[-50%]',
          'animation-rainbow after:(b-color-[var(--vp-c-brand-next)])',
          'after:(content-[""] b-y-2.5)',
          'after:(absolute top-[-50%] bottom-[-50%] left-[-50%] right-[-50%] scale-[.5])'
        )}></div>
    </div>
  )
}
