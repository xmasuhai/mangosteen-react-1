import { useChartTooltipCarousel } from '@/hooks/useChartCarousel'
import { useChartLifeCycle } from '@/hooks/useChartLifeCycle'
import type { EChartsOption } from 'echarts'
import type { OptionDataValue } from 'echarts/types/src/util/types.js'
import { useEffect } from 'react'

interface Props {
  className?: string
  chartData?: { name: string; value: number }[]
}

export const AmountProportionChart: React.FC<Props> = ({ className, chartData }) => {
  const { chartId, chartDomRef, chartInstanceRef } = useChartLifeCycle()

  useEffect(() => {
    if (!chartInstanceRef.current || chartInstanceRef.current?.isDisposed()) {
      return
    }

    const option: EChartsOption = {
      grid: { left: 0, right: 0, top: 0, bottom: 0 },
      tooltip: {
        trigger: 'item',
        valueFormatter: (value: OptionDataValue | OptionDataValue[]) => {
          return Array.isArray(value) ? '' : `¥ ${value}`
        },
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }

    chartInstanceRef.current.setOption(option)
  }, [chartData, chartInstanceRef])

  // 轮播 tooltip
  useChartTooltipCarousel({
    chartInstance: chartInstanceRef,
    chartDomRef,
    dataLength: chartData?.length ?? 0,
    initDelay: 800,
    interval: 1800,
  })

  return <div ref={chartDomRef} id={chartId} className={className} />
}
