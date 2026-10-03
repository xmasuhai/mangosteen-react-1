import { animated, useTransition } from '@react-spring/web'
import { cn } from 'cn'
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

export const SwiperGuide: React.FC = () => {
  const mapRef = useRef<Record<string, ReactNode>>({})
  const { pathname } = useLocation()
  // 获取当前的 outlet
  const currentOutlet = useOutlet() as React.ReactElement
  mapRef.current[pathname] = currentOutlet

  const [extraStyle, setExtraStyle] = useState<Record<string, string | number>>({ position: 'relative' })
  // 3. 根据方向动态设置动画的初始位置和退出位置
  const transitions = useTransition(pathname, {
    onStart: () => { setExtraStyle({ position: 'absolute' }) },
    onRest: () => { setExtraStyle({ position: 'relative' }) },
    from: { opacity: 0, transform: 'translate3D(100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3D(0%, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3D(-100%, 0, 0)' },
    // 物理参数微调：让过渡更轻快
    config: { tension: 280, friction: 30, duration: 300 },
  })

  return (
    <main
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
