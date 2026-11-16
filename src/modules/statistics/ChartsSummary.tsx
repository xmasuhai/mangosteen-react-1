import { AmountProgress } from '@/modules/statistics/AmountProgress'
import { AmountProportionChart } from '@/modules/statistics/AmountProportionChart'
import { DateAmountChart } from '@/modules/statistics/DateAmountChart'
import { cn } from 'cn'

interface Props {
  className?: string
  startDate: string
  endDate: string
}

export const ChartsSummary: React.FC<Props> = ({ className, startDate, endDate }) => {
  console.log('ChartsSummary_______________________')
  console.log('%c⧭', 'color: #807160', endDate)
  console.log('%c⧭', 'color: #731d1d', startDate)
  console.log('_______________________ChartsSummary')

  const items = [
    { date: '2026-12-01', amount: 1200 },
    { date: '2026-12-02', amount: 2300 },
    { date: '2026-12-03', amount: 2300 },
    { date: '2026-12-04', amount: 2300 },
    { date: '2026-12-05', amount: 2300 },
    { date: '2026-12-06', amount: 2300 },
    { date: '2026-12-30', amount: 1800 },
  ].map((item) =>
    ({ x: item.date, y: item.amount / 100 }))
  return (
    <div className={className}>
      {/* 类型选择器 */}
      {/* 折线图 */}
      <DateAmountChart chartData={items} className={cn('h-150px px-.5em')} />

      {/* 饼图 */}
      <AmountProportionChart />

      {/* 排名条 */}
      <AmountProgress />
    </div>
  )
}
