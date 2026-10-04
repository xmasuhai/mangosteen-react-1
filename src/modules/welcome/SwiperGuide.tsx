import { useSwipe } from '@/hooks/useSwipe'
import { animated, useTransition } from '@react-spring/web'
import { cn } from 'cn'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'

const forwardLinkMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/home',
} as const

interface Position { position: 'relative' | 'absolute' }

export const SwiperGuide: React.FC = () => {
  const { pathname } = useLocation()
  const mapRef = useRef<Record<string, ReactNode>>({})
  const currentOutlet = useOutlet() as React.ReactElement
  mapRef.current[pathname] = currentOutlet

  const [extraStyle, setExtraStyle] = useState<Position>({ position: 'relative' })

  const isAnimatingRef = useRef(false)
  const mainRef = useRef<HTMLElement>(null)
  const { direction } = useSwipe(mainRef)

  const transitions = useTransition(pathname, {
    onStart: () => { setExtraStyle({ position: 'absolute' }) },
    onRest: () => {
      isAnimatingRef.current = false
      setExtraStyle({ position: 'relative' })
    },
    from: { opacity: 0, transform: 'translate3D(100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3D(0%, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3D(-100%, 0, 0)' },
    // 物理参数微调：让过渡更轻快
    config: { tension: 280, friction: 30, duration: 300 },
  })

  const nav = useNavigate()
  useEffect(() => {
    if (isAnimatingRef.current) { return }
    if (direction === 'left') {
      isAnimatingRef.current = true
      nav(forwardLinkMap[pathname], { replace: true })
    }
  }, [direction, nav, pathname])

  return (
    <main
      ref={mainRef}
      className={cn(
        'grow-1 shrink-1 mb-2em relative overflow-clip',
      )}>
      {transitions((style, pathname) => (
        <animated.div
          key={pathname}
          style={{ ...style, ...extraStyle }}
          className={cn(
            'flex h-100% w-100% p-16px',
          )}>
          <div
            className={cn(
              'grow-1 flex justify-center items-center',
              'bg-white rounded-8px',
            )}>
            {mapRef.current[pathname]}
          </div>
        </animated.div>
      ))}
    </main>
  )
}
