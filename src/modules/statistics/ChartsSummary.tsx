import { AmountProgress } from '@/modules/statistics/AmountProgress'
import { AmountProportionChart } from '@/modules/statistics/AmountProportionChart'
import { DateAmountChart } from '@/modules/statistics/DateAmountChart'

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

  return (
    <div className={className}>
      {/* 类型选择器 */}
      {/* 柱状图 */}
      <DateAmountChart />

      {/* 饼图 */}
      <AmountProportionChart />

      {/* 排名条 */}
      <AmountProgress />
    </div>
  )
}
