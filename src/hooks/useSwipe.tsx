import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}

type SwipeDirection = '' | 'left' | 'right' | 'up' | 'down'
const SWIPE_THRESHOLD = 3

function getSwipeDirection(distanceX: number, distanceY: number): SwipeDirection {
  if (Math.abs(distanceX) > Math.abs(distanceY)) {
    if (Math.abs(distanceX) < SWIPE_THRESHOLD) { return '' }
    return distanceX > 0 ? 'right' : 'left'
  } else {
    if (Math.abs(distanceY) < SWIPE_THRESHOLD) { return '' }
    return distanceY > 0 ? 'down' : 'up'
  }
}

// eslint-disable-next-line antfu/top-level-function
export const useSwipe = (
  elementRef: RefObject<HTMLElement | null>,
  config?: Config,
) => {
  const [direction, setDirection] = useState<SwipeDirection>('')
  const coordinateXRef = useRef(-1)
  const coordinateYRef = useRef(-1)

  const onTouchStart = (e: TouchEvent) => {
    config?.onTouchStart?.(e)
    coordinateXRef.current = e.touches[0].clientX
    coordinateYRef.current = e.touches[0].clientY
  }

  const onTouchMove = (e: TouchEvent) => {
    config?.onTouchMove?.(e)
    const tempX = e.touches[0].clientX
    const tempY = e.touches[0].clientY
    const distanceX = tempX - coordinateXRef.current
    const distanceY = tempY - coordinateYRef.current
    setDirection(getSwipeDirection(distanceX, distanceY))
  }

  const onTouchEnd = (e: TouchEvent) => {
    config?.onTouchEnd?.(e)
    setDirection('')
  }

  useEffect(() => {
    const el = elementRef.current
    if(!el) { return }
    const aborter = new AbortController()
    const opts = { signal: aborter.signal }
    el.addEventListener('touchstart', onTouchStart, opts)
    el.addEventListener('touchmove', onTouchMove, opts)
    el.addEventListener('touchend', onTouchEnd, opts)
    return () => { aborter.abort() }
  }, [])

  return ({
    direction,
  })
}
