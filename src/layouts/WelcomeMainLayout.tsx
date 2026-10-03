import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { NavLink, useLocation, useOutlet } from 'react-router-dom'
import logo from '@/assets/icons/mangosteen.svg'
import { cn } from 'cn'

export const WelcomeMainLayout: React.FC = () => {
  const mapRef = useRef<Record<string, ReactNode>>({})
  const { pathname } = useLocation()
  // 获取当前的 outlet
  const currentOutlet = useOutlet() as React.ReactElement
  mapRef.current[pathname] = currentOutlet

  const [extraStyle, setExtraStyle] = useState({ position: 'relative' })
  // 3. 根据方向动态设置动画的初始位置和退出位置
  const transitions = useTransition(pathname, {
    onStart: () => { setExtraStyle({ position: 'absolute' }) },
    onRest: () => { setExtraStyle({ position: 'relative' }) },
    from: { /* opacity: 0, */ transform: 'translate3D(100%, 0, 0)' },
    enter: { /* opacity: 1, */ transform: 'translate3D(0%, 0, 0)' },
    leave: { /* opacity: 0, */ transform: 'translate3D(-100%, 0, 0)' },
    // 物理参数微调：让过渡更轻快
    config: { duration: 300 },
  })

  return (
    <div className={cn(
      'bg-[#5f34bf]',
      'h-screen pb-16px',
      'flex flex-col items-stretch',
    )}>

      <header shrink-0 text-center pt-4em>
        <img alt="logo" src={logo} w-64px h-69px inline />
        <h1 text="#d4d4ee" text-2em>山竹记账</h1>
      </header>

      <main
        className={cn(
          'grow-1 shrink-1 mb-2em relative',
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

      <section
        className={cn(
          'fixed right-[0.5em] top-[0.25em]',
          'text-[#d4d4ee] text-[1.5em]',
        )}>
        <NavLink to="/welcome/1">跳过</NavLink>
      </section>
    </div>
  )
}
