/**
 * @Description: 节流
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-12 20:53:44
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-12 21:52:10
 * @FilePath: src/shared/throttle.ts
 */
export const throttledFn = <F extends (...args: any[]) => unknown>(fn: F, delay: number = 500) => {
  let timer: NodeJS.Timeout | null = null
  let result: ReturnType<F>
  return (...args: Parameters<F>) => {
    if (timer) {
      return result
    }
    result = fn(...args) as ReturnType<F>
    timer = setTimeout(() => {
      clearTimeout(timer as NodeJS.Timeout)
      timer = null
    }, delay)
    return result
  }
}
