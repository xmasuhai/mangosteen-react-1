import { cn } from 'cn'
import { DateTimeColumn } from '@/components/form/DateTimeColumn'
import { createDateTime } from '@/lib/helpers/DateTime'
import { useRef, useState } from 'react'

interface Props {
  className?: string
  start?: Date
  end?: Date
  value?: Date
  dateItemHeight?: number
  onChange?: (value: Date) => void
  onCancel?: () => void
  onConfirm?: (dateTimeStr: string) => void
}

export const DatePickerPopup: React.FC<Props> = ({
  className,
  start,
  end,
  value,
  dateItemHeight = 36,
  onCancel,
  onConfirm,
}) => {
  const startTime = start ? createDateTime(start) : createDateTime().add(-3, 'year')
  const endTime = end ? createDateTime(end) : createDateTime().add(3, 'year')
  if (startTime.getTimestamp() >= endTime.getTimestamp()) {
    throw new Error('startTime must be greater than endTime')
  }

  const valueTime = useRef(value ? createDateTime(value) : createDateTime())
  const [_, forceUpdate] = useState({})

  const yearList = Array.from({ length: endTime.year - startTime.year + 1 })
    .map((_, i) => startTime.year + i)
    .map((item) => item.toString())
  const monthList = Array.from({ length: 12 })
    .map((_, i) => i + 1)
    .map((item) => item.toString())
  const dayList = Array.from({ length: valueTime.current.lastDayOfMonth })
    .map((_, i) => i + 1)
    .map((item) => item.toString())

  const onChangeYear = (value: string) => {
    valueTime.current.year = parseInt(value)
    forceUpdate({})
  }
  const onChangeMonth = (value: string) => {
    valueTime.current.month = parseInt(value)
    forceUpdate({})
  }
  const onChangeDay = (value: string) => {
    valueTime.current.day = parseInt(value)
    forceUpdate({})
  }

  return (
    <section className={className}>
      {/* 顶部按钮 */}
      <div
        className={cn(
          'flex justify-between p-[.5em]',
          'bg-white b-b-1 b-b-[#f3f3f3]',
          'children:(p-[.5em])'
        )}>
        <span onClick={onCancel}>取消</span>
        <span>日期选择</span>
        <span onClick={() => onConfirm?.(valueTime.current.format('YYYY-MM-DD'))}>确认</span>
      </div>

      {/* 日期选择 */}
      <div className={cn('flex relative')}>
        <DateTimeColumn
          className="grow-1"
          dateTimeValue={valueTime.current.year.toString()}
          dateTimeList={yearList}
          dateItemHeight={dateItemHeight}
          onChange={onChangeYear}
        />
        <DateTimeColumn
          className="grow-1"
          dateTimeValue={valueTime.current.month.toString()}
          dateTimeList={monthList}
          dateItemHeight={dateItemHeight}
          onChange={onChangeMonth}
        />
        <DateTimeColumn
          className="grow-1"
          dateTimeValue={valueTime.current.day.toString()}
          dateTimeList={dayList}
          dateItemHeight={dateItemHeight}
          onChange={onChangeDay}
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
    </section>
  )
}
