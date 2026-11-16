interface Props {
  className?: string
  startDate: string
  endDate: string
}

export const ChartsSummary: React.FC<Props> = ({ className, startDate, endDate }) => {
  return (
    <div className={className}>
      ChartsSummary
      {/* 类型选择器 */}
      {/* 柱状图 */}
      {/* 饼图 */}
      {/* 排名条 */}
    </div>
  )
}
