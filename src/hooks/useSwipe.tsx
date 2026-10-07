import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}

type SwipDirection = '' | 'left' | 'right'
const SWIPE_THRESHOLD = 3

function getSwipDirection(distance: number): SwipDirection {
  if(Math.abs(distance) < SWIPE_THRESHOLD) { return '' }
  return distance > 0 ? 'right' : 'left'
}

// eslint-disable-next-line antfu/top-level-function
export const useSwipe = (
  elementRef: RefObject<HTMLElement | null>,
  config?: Config,
) => {
  const [direction, setDirection] = useState<SwipDirection>('')
  const coordinateXRef = useRef(-1)

  const onTouchStart = (e: TouchEvent) => {
    config?.onTouchStart?.(e)
    coordinateXRef.current = e.touches[0].clientX
  }

  const onTouchMove = (e: TouchEvent) => {
    config?.onTouchMove?.(e)
    const tempX = e.touches[0].clientX
    const distance = tempX - coordinateXRef.current
    setDirection(getSwipDirection(distance))
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
