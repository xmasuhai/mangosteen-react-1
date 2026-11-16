import { cn } from 'cn'
import * as echarts from 'echarts'
import { useRef, useEffect, useId } from 'react'

interface Props {
  className?: string
  chartData?: { x: number | string; y: number }[]
}

export const DateAmountChart: React.FC<Props> = ({ className, chartData }) => {
  const chartId = useId()
  const chartDom = useRef<HTMLDivElement>(null)
  const xItems = chartData?.map((item) => item.x)
  const yItems = chartData?.map((item) => item.y)

  useEffect(() => {
    if (!chartDom) {
      return
    }
    const chart = echarts.init(chartDom.current)
    const option = {
      grid: { left: 0, right: 0, top: 0, bottom: 0 },
      tooltip: {},
      xAxis: {
        data: xItems,
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'line',
          data: yItems,
        },
      ],
    }
    chart.setOption(option)
  }, [])
  return <div ref={chartDom} id={chartId} className={cn(className, 'h-400px')} />
}
