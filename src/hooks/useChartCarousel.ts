import { useEffect, useRef } from 'react'
import type { ECharts } from 'echarts'

interface UseChartCarouselOptions {
  /** ECharts 实例的 Ref */
  chartInstance: React.MutableRefObject<ECharts | null>
  /** 图表容器 DOM 的 Ref（用于绑定移动端触摸事件） */
  chartDomRef: React.RefObject<HTMLDivElement | null>
  /** 数据总长度（数据更新或为 0 时自动重置轮播） */
  dataLength: number
  /** 轮播间隔时间（毫秒），默认 2000ms */
  interval?: number
  /** 初始化延迟触发时间（毫秒），默认 800ms（等待图表动画完成） */
  initDelay?: number
  /** 目标系列索引，默认 0 */
  seriesIndex?: number
  /** 是否开启自动轮播，默认 true */
  enabled?: boolean
}

/*
 * @Description: tooltip 轮播图表数据
 * @Author: xmasuhai
 * @Email: xmasuhai@163.com
 * @Date: 2026-11-17 13:57:03
 * @Last Modified by:   xmasuhai
 * @Last Modified time: 2026-11-17 13:59:26
 * @Path: @/hooks/useChartCarousel.ts
 */
export function useChartTooltipCarousel({
  chartInstance,
  chartDomRef,
  dataLength = 0,
  interval = 2000,
  initDelay = 800,
  seriesIndex = 0,
  enabled = true,
}: UseChartCarouselOptions) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentCarouselIndexRef = useRef<number>(0)

  useEffect(() => {
    const chart = chartInstance.current
    const dom = chartDomRef.current

    // 防御性检查：实例未挂载、已销毁、未启用或无数据时不启动
    if (!enabled || !chart || chart.isDisposed() || !dom || dataLength <= 0) {
      return
    }

    // 1. 触发指定索引的 Tooltip 与高亮状态
    const showTipAt = (index: number) => {
      if (chart.isDisposed()) return
      chart.dispatchAction({
        type: 'showTip',
        seriesIndex,
        dataIndex: index,
      })
      chart.dispatchAction({ type: 'downplay', seriesIndex })
      chart.dispatchAction({
        type: 'highlight',
        seriesIndex,
        dataIndex: index,
      })
    }

    // 2. 启动与停止定时器
    const stopCarousel = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      if (touchEndTimerRef.current) {
        clearTimeout(touchEndTimerRef.current)
        touchEndTimerRef.current = null
      }
    }

    const startCarousel = () => {
      stopCarousel()
      // 只有 1 条数据时展示第一项即可，无需开启循环定时器
      if (dataLength <= 1) return

      timerRef.current = setInterval(() => {
        // 轮播逻辑精髓 取余 实现循环
        currentCarouselIndexRef.current = (currentCarouselIndexRef.current + 1) % dataLength
        showTipAt(currentCarouselIndexRef.current)
      }, interval)
    }

    // 3. PC 端鼠标交互
    const handleMouseOver = (params: { dataIndex?: number }) => {
      stopCarousel()
      if (typeof params.dataIndex === 'number') {
        currentCarouselIndexRef.current = params.dataIndex
      }
    }
    const handleGlobalOut = () => {
      startCarousel()
    }

    chart.on('mouseover', handleMouseOver)
    chart.on('globalout', handleGlobalOut)

    // 4. 移动端触摸交互
    const handleTouchStart = () => {
      stopCarousel()
    }
    const handleTouchEnd = () => {
      // 延迟 500ms 恢复，避免手指离开瞬间的点击事件与轮播冲突
      touchEndTimerRef.current = setTimeout(() => {
        startCarousel()
      }, 500)
    }

    dom.addEventListener('touchstart', handleTouchStart, { passive: true })
    dom.addEventListener('touchend', handleTouchEnd)

    // 5. 页面切后台/锁屏时自动暂停，节省移动端性能
    const handleVisibilityChange = () => {
        document.hidden ? stopCarousel() : startCarousel();
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // 6. 首次延迟展示第一项并启动轮播
    const initTimer = setTimeout(() => {
      if (chart.isDisposed()) return
      currentCarouselIndexRef.current = 0
      showTipAt(0)
      startCarousel()
    }, initDelay)

    // 7. 清理所有副作用
    return () => {
      clearTimeout(initTimer)
      stopCarousel()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      dom.removeEventListener('touchstart', handleTouchStart)
      dom.removeEventListener('touchend', handleTouchEnd)
      if (!chart.isDisposed()) {
        chart.off('mouseover', handleMouseOver)
        chart.off('globalout', handleGlobalOut)
      }
    }
  }, [chartInstance, chartDomRef, dataLength, interval, initDelay, seriesIndex, enabled])
}
