import { cn } from 'cn'
import * as echarts from 'echarts'
import { useEffect, useId, useRef } from 'react'
import type { EChartsOption, TooltipComponentFormatterCallbackParams } from 'echarts'

interface Props {
  className?: string
  chartData?: { x: number | string; y: number }[]
}

export const DateAmountChart: React.FC<Props> = ({ className, chartData }) => {
  const chartId = useId()
  const chartDomRef = useRef<HTMLDivElement>(null)
  const xItems = chartData?.map((item) => item.x)
  const yItems = chartData?.map((item) => item.y)

  useEffect(() => {
    if (!chartDomRef.current) {
      return
    }
    // 挂载标识
    let isMounted = true

    // 1. 检查该 DOM 是否已经初始化过 ECharts 实例
    let chartInstance = echarts.getInstanceByDom(chartDomRef.current)
    // 2. 如果没有，则进行初始化
    if (!chartInstance) {
      chartInstance = echarts.init(chartDomRef.current)
    }

    const option: EChartsOption = {
      grid: { left: '5%', right: '5%', top: '20%', bottom: '20%' },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: (params: TooltipComponentFormatterCallbackParams) => {
          const { seriesName, marker, axisValue, data, /* color */ } = params?.[0] ?? {}
          const partsDate = axisValue.split('-')
          const label = `${partsDate[0]}年${partsDate[1]}月${partsDate[2]}日`
          const dataValue = data === null ? '无数据' : `¥ ${data}元`
          // 未实现 style="{border: '3px solid ${color}'}"
          return `
            <div>
              ${marker} ${seriesName}
            </div>
            <div>
              <span>${label}</span>
              <span>${dataValue}</span>
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
    // 如果组件已经卸载，则不执行下一步渲染，防止严格模式（Strict Mode） 触发组件双重渲染
    if (!isMounted || chartInstance.isDisposed()) {
      return
    }
    // 3. 渲染你的图表数据
    chartInstance.setOption(option)

    // 记录定时器 ID，并在回调中再次检查实例状态
    const timer = setTimeout(() => {
      if (chartInstance.isDisposed() || xItems?.length === 0) {
        return
      }
      chartInstance?.dispatchAction({
        type: 'showTip',
        // 轴触发类型（trigger: 'axis'）时使用:
        seriesIndex: 0, // 第几个 series（通常为 0）
        dataIndex: 0, // 显示第一项（索引从 0 开始）
      })
    }, 0)

    // 4. 组件卸载或重新执行 effect 前销毁实例
    return () => {
      clearTimeout(timer)
      isMounted = false
      chartInstance?.dispose()
    }
  }, [])

  return <div ref={chartDomRef} id={chartId} className={cn(className)} />
}
