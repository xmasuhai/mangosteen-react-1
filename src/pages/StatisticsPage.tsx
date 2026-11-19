import { DateRangePicker, type DateTabRangeStr } from '@/components/DateRangePicker'
import { GradientBanner } from '@/components/GradientBanner'
import { SvgIcon } from '@/components/SvgIcon'
import { TopNav } from '@/components/TopNav'
import { ChartsSummary } from '@/modules/statistics/ChartsSummary'
import { cn } from 'cn'
import { useState } from 'react'

interface Props {
  className?: string
}

export const StatisticsPage: React.FC<Props> = ({ className }) => {
  const Icon = <SvgIcon name="back-arrow" className="size-[24px]" />
  const [selectedDate, setSelectedDate] = useState<DateTabRangeStr>('thisMonth')
  return (
    <div className={cn('container w-screen h-screen relative', className)}>
      <GradientBanner>
        <TopNav icon={Icon} title="统计图表" />
      </GradientBanner>

      <DateRangePicker selectedId={selectedDate} onSelect={setSelectedDate} />
      <main className="h-[calc(var(--safe-screen-height,100vh)-112px)]">
        <ChartsSummary startDate={selectedDate} endDate={selectedDate} />
      </main>
    </div>
  )
}
