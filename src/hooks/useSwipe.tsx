import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}

// eslint-disable-next-line antfu/top-level-function
export const useSwipe = (
  elementRef: RefObject<HTMLElement | null>,
  config?: Config,
) => {
  const [direction, setDirection] = useState<'' | 'left' | 'right'>('')
  const coordinateXRef = useRef(-1)

  const onTouchStart = (e: TouchEvent) => {
    config?.onTouchStart?.(e)
    coordinateXRef.current = e.touches[0].clientX
  }

  const onTouchMove = (e: TouchEvent) => {
    config?.onTouchMove?.(e)
    const tempX = e.touches[0].clientX
    const distance = tempX - coordinateXRef.current

    if (Math.abs(distance) < 3) { setDirection('') }
    if (distance > 0) { setDirection('right') }
    if (distance < 0) { setDirection('left') }
  }

  const onTouchEnd = (e: TouchEvent) => {
    config?.onTouchEnd?.(e)
    setDirection('')
  }

  useEffect(() => {
    const refCurrent = elementRef.current
    if (!refCurrent) { return }
    refCurrent.addEventListener('touchstart', onTouchStart)
    refCurrent.addEventListener('touchmove', onTouchMove)
    refCurrent.addEventListener('touchend', onTouchEnd)

    return () => {
      if (!refCurrent) { return }
      refCurrent.removeEventListener('touchstart', onTouchStart)
      refCurrent.removeEventListener('touchmove', onTouchMove)
      refCurrent.removeEventListener('touchend', onTouchEnd)
    }
  // eslint-disable-next-line react/exhaustive-deps
  }, [])

  return ({
    direction,
  })
}
