import * as echarts from 'echarts'
import { useEffect, useId, useRef } from 'react'

export const useChartLifeCycle = () => {
  const chartId = useId()
  const chartDomRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)

  // 1. 仅负责在挂载时初始化，卸载时销毁
  useEffect(() => {
    if (!chartDomRef.current) {
      return
    }
    // 优先获取已存在的实例，避免重复初始化
    // 1. 检查该 DOM 是否已经初始化过 ECharts 实例
    // 2. 如果没有，则进行初始化
    chartInstanceRef.current =
      echarts.getInstanceByDom(chartDomRef.current) ?? echarts.init(chartDomRef.current)

    const handleResize = () => {
      if (chartInstanceRef.current && !chartInstanceRef.current?.isDisposed()) {
        chartInstanceRef.current?.resize?.()
      }
    }
    window.addEventListener('resize', handleResize)
    // 组件卸载或重新执行 effect 前销毁实例
    return () => {
      window.removeEventListener('resize', handleResize)
      chartInstanceRef.current?.dispose()
      chartInstanceRef.current = null
    }
  }, [])

  return {
    chartId,
    chartDomRef,
    chartInstanceRef,
  }
}
