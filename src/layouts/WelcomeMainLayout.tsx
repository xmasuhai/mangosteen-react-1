import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { Outlet, useLocation, useOutlet } from 'react-router-dom'

const map: Record<string, ReactNode> = {}
export const WelcomeMainLayout: React.FC = () => {
  const location = useLocation()

  const outlet = useOutlet()
  map[location.pathname] = outlet

  const transitions = useTransition(location.pathname, {
    // 进入状态
    from: { transform: 'translateX(100%)' },
    // 稳定状态
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 5000 },
  })

  window.console.log('WelcomeMainLayout_______________________')
  window.console.log('_______________________WelcomeMainLayout')

  return transitions((style, pathname) => {
    window.console.log('transitions_______________________')
    window.console.log('✌️style --->', style)
    window.console.log('✌️pathname --->', pathname)
    window.console.log('_______________________transitions')
    return (
      <animated.div key={pathname} style={style}>
        <div style={{ textAlign: 'right' }}>
          {map[pathname]}
        </div>
      </animated.div>
    )
  })
}
