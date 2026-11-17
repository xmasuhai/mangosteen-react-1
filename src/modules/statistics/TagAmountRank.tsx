import type { RankChartItem } from '@/modules/statistics/chartData'
import { cn } from 'cn'

interface Props {
  className?: string
  chartData: RankChartItem[]
}

export const TagAmountRank: React.FC<Props> = ({ className, chartData }) => {
  return (
    <div
      className={cn(
        'bar-progress mb-8em px-1.5em',
        '[&>.top-item]:[--sibling-idx:calc(1*sibling-index())]',
        className
      )}>
      {chartData.map(({ id, tag, amount, percent }) => (
        <div
          key={`${id}-${tag.tag_id}`}
          style={{ '--width-percent': `${percent}%` }}
          className={cn('top-item mb-1em flex items-center justify-between')}>
          <div
            className={cn(
              'sign size-3em rounded-[50%] bg-[var(--tag-bg)]',
              'border-1 border-color-[oklch(70%_0.15_calc(var(--sibling-idx)*70))]',
              'grow-0 shrink-0 flex items-center justify-center'
            )}>
            {tag.sign}
          </div>
          <div className="bar-wrapper ml-1em grow-1 shrink-1">
            <div className="bar_text text-[var(--text-muted)] flex items-center justify-between">
              <span>
                {tag.name} - {percent}%
              </span>
              <span> ¥ {amount}</span>
            </div>
            <div className="bar h-.5em rounded-.25em bg-[var(--bar-bg)] relative overflow-clip mt-.25em">
              <div
                className={cn(
                  'bar_inner absolute top-0 left-0',
                  `w-[var(--width-percent)] h-full`,
                  `bg-[oklch(70%_0.15_calc(var(--sibling-idx)*70))]`
                )}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
