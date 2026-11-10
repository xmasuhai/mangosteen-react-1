import { useEffect, useRef, useCallback } from 'react'

export interface UseVibrateOptions {
  /**
   * 是否循环震动
   * @default false
   */
  isLoop?: boolean
}

export const useVibrate = (
  pattern: VibratePattern = 15, // 默认轻触反馈 15ms
  options: UseVibrateOptions = {}
) => {
  const { isLoop = false } = options
  const intervalRef = useRef<number | null>(null)

  // 检查当前浏览器是否支持
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator

  // 1. 核心震动方法
  const trigger = useCallback(
    (customPattern?: VibratePattern) => {
      if (!isSupported) return
      navigator.vibrate(customPattern ?? pattern)
    },
    [isSupported, pattern]
  )

  // 2. 停止震动方法
  const stop = useCallback(() => {
    if (!isSupported) return
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (!navigator.userActivation.hasBeenActive) return
    navigator?.vibrate?.(0) // 传入 0 即可立即停止当前所有震动
  }, [isSupported])

  // 3. 启动循环震动
  const start = useCallback(() => {
    if (!isSupported) return
    stop() // 启动前先清除上一次的定时器

    // 如果是数组，计算一个完整的震动周期总耗时
    const duration = Array.isArray(pattern)
      ? pattern.reduce((acc, cur) => acc + cur, 0)
      : (pattern as number)

    trigger() // 先执行第一次

    if (isLoop) {
      intervalRef.current = window.setInterval(() => {
        trigger()
      }, duration + 50) // 加 50ms 缓冲，避免硬件响应不过来导致连续震动粘连
    }
  }, [isSupported, pattern, isLoop, trigger, stop])

  // 组件卸载时自动清理，防止内存泄漏或后台持续震动
  useEffect(() => {
    return () => stop()
  }, [stop])

  return {
    isSupported,
    vibrate: trigger, // 触发单次/传入模式震动
    start, // 开始循环（如果配置了 isLoop: true）
    stop, // 停止震动
  }
}
