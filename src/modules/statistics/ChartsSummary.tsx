import { TagAmountRank } from '@/modules/statistics/TagAmountRank'
import { AmountProportionChart } from '@/modules/statistics/AmountProportionChart'
import { DateAmountChart } from '@/modules/statistics/DateAmountChart'
import { cn } from 'cn'
import type { RankChartItem, lineChartsItem, pieChartsItem } from '@/modules/statistics/chartData'
import { FormItem } from '@/components/form/item/FormItem'
import { useState } from 'react'
import type { TabKind } from '@/global'

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

  const lineChartItems: lineChartsItem[] = [
    { date: '2026-12-01', amount: 1200 },
    { date: '2026-12-02', amount: 2300 },
    { date: '2026-12-03', amount: 2300 },
    { date: '2026-12-04', amount: 2300 },
    { date: '2026-12-05', amount: 2300 },
    { date: '2026-12-06', amount: 2300 },
    { date: '2026-12-30', amount: 1800 },
  ].map((item) => ({ x: item.date, y: item.amount / 100 }))

  const pieChartItems: pieChartsItem[] = [
    { amount: 10480, name: 'Search Engine' },
    { amount: 7350, name: 'Direct' },
    { amount: 5800, name: 'Email' },
    { amount: 4840, name: 'Union Ads' },
    { amount: 3000, name: 'Video Ads' },
  ].map((item) => ({ name: item.name, value: item.amount / 100 }))

  const rankChartItems: RankChartItem[] = [
    { id: 1, tag: { sign: '😄', name: '房租', tag_id: 1 }, amount: 3112, percent: 11 },
    { id: 2, tag: { sign: '💰', name: '工资', tag_id: 2 }, amount: 32112, percent: 56 },
    { id: 3, tag: { sign: '💵', name: '奖金', tag_id: 3 }, amount: 12323, percent: 33 },
  ]

  const [kind, setKind] = useState<TabKind>('expenses')

  return (
    <div className={className}>
      {/* 类型选择器 */}
      <div className={cn('form-sc w-full mt-1em px-1.5em')}>
        <FormItem
          formItemType="optionSelector"
          formItemTypeProps={{
            label: '类型',
            ifOneLineLabel: true,
            labelFor: 'kind',
            placeholder: '请选择类型',
            value: kind,
            onChange: (value: TabKind) => setKind(value),
            // onBlur: () => {},
            // onFocus: () => {},
            options: [
              { value: 'expenses', label: '支出' },
              { value: 'incomes', label: '收入' },
            ],
            hasErrorPlaceholder: false,
          }}
        />
      </div>

      {/* 折线图 */}
      <DateAmountChart chartData={lineChartItems} className={cn('h-160px px-1.5em')} />

      {/* 饼图 */}
      <AmountProportionChart chartData={pieChartItems} className={cn('h-320px px-.5em')} />

      {/* 排名条 */}
      <TagAmountRank chartData={rankChartItems} className={cn('h-360px px-.5em')} />
    </div>
  )
}
