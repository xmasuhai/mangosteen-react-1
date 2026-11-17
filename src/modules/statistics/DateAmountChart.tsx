import { cn } from 'cn'
import { useEffect } from 'react'
import type { EChartsOption, TooltipComponentFormatterCallbackParams } from 'echarts'
import { useChartTooltipCarousel } from '@/hooks/useChartCarousel'
import { useChartLifeCycle } from '@/hooks/useChartLifeCycle'
import type { lineChartsItem } from '@/modules/statistics/chartData'

interface Props {
  className?: string
  chartData?: lineChartsItem[]
}

export const DateAmountChart: React.FC<Props> = ({ className, chartData }) => {
  const { chartId, chartDomRef, chartInstanceRef } = useChartLifeCycle()

  // 2. 负责监听 chartData 变化重新渲染图表
  useEffect(() => {
    const xItems = chartData?.map((item) => item.x)
    const yItems = chartData?.map((item) => item.y)
    // 如果组件已经卸载，则不执行下一步渲染，防止严格模式（Strict Mode） 触发组件双重渲染
    if (!chartInstanceRef.current || chartInstanceRef.current?.isDisposed()) {
      return
    }

    const option: EChartsOption = {
      grid: { left: 0, right: 0, top: '20%', bottom: '20%' },
      tooltip: {
        show: true,
        confine: true,
        // 改用 axis 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
        trigger: 'axis',
        formatter: (params: TooltipComponentFormatterCallbackParams) => {
          if (!Array.isArray(params) || params.length === 0) {
            return ''
          }
          const { seriesName, marker, name, data } = params[0]
          const partsDate = name.split('-')
          const label = `${partsDate[0]}年${partsDate[1]}月${partsDate[2]}日`
          const dataValue = data === null ? '无数据' : `¥ ${data}元`
          return `
                <div>
                  <div style="font-size:14px;color:#6d6e73;font-weight:400;margin-left:2px">
                    ${marker} ${seriesName}
                  </div>
                  <div style="font-size:14px;color:#6d6e73;">
                    <span style="" >${label}</span>
                    <span style="float:right;margin-left:20px;font-weight:900" >${dataValue}</span>
                  </div>
                </div>
              `
        },
      },
      xAxis: {
        type: 'category',
        data: xItems,
        axisLabel: {
          formatter: (label: string /* index: number */) => {
            const sliceSignIndex = label.indexOf('-')
            return label.slice(sliceSignIndex + 1)
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false,
        },
      },
      series: [
        {
          name: '销量',
          type: 'line',
          data: yItems,
          emphasis: {
            focus: 'series',
            scale: 2,
            blurScope: 'series',
            itemStyle: {
              borderWidth: 3,
            },
          },
        },
      ],
    }
    // 3. 渲染图表数据
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

  return <div ref={chartDomRef} id={chartId} className={cn(className)} />
}
