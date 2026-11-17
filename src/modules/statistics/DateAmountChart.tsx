import { cn } from 'cn'
import * as echarts from 'echarts'
import { useEffect, useId, useRef, } from 'react'
import type { EChartsOption, TooltipComponentFormatterCallbackParams } from 'echarts'
import { useChartTooltipCarousel } from '@/hooks/useChartCarousel';

interface Props {
  className?: string
  chartData?: { x: number | string; y: number }[]
}

export const DateAmountChart: React.FC<Props> = ({ className, chartData }) => {
  const chartId = useId()
  const chartDomRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  // 1. 仅负责在挂载时初始化，卸载时销毁
  useEffect(() => {
    if (!chartDomRef.current) {
      return
    }
    // 优先获取已存在的实例，避免重复初始化
    // 1. 检查该 DOM 是否已经初始化过 ECharts 实例
    // 2. 如果没有，则进行初始化
    chartInstance.current = echarts.getInstanceByDom(chartDomRef.current) ??
      echarts.init(chartDomRef.current)

    const handleResize = () => {
      if (chartInstance.current && !chartInstance.current?.isDisposed()) {
        chartInstance.current?.resize?.()
      }
    }
    window.addEventListener('resize', handleResize)

    // 组件卸载或重新执行 effect 前销毁实例
    return () => {
      window.removeEventListener('resize', handleResize)
      chartInstance.current?.dispose()
      chartInstance.current = null
    }
  }, [])

  // 2. 负责监听 chartData 变化重新渲染图表
  useEffect(() => {
    const xItems = chartData?.map((item) => item.x)
    const yItems = chartData?.map((item) => item.y)
    // 如果组件已经卸载，则不执行下一步渲染，防止严格模式（Strict Mode） 触发组件双重渲染
    if (!chartInstance.current || chartInstance.current?.isDisposed()) {
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
                  <div>
                    ${marker} ${seriesName}
                  </div>
                  <div>
                    <span>${label}</span>
                    <span>${dataValue}</span>
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
    chartInstance.current.setOption(option)

  }, [chartData])

  // 轮播 tooltip
  useChartTooltipCarousel({
    chartInstance,
    chartDomRef,
    dataLength: chartData?.length ?? 0,
    initDelay: 800,
    interval: 1800,
  })

  return <div ref={chartDomRef} id={chartId} className={cn(className)} />
}
