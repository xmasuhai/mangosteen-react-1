import { animated, useTransition } from '@react-spring/web'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

export const WelcomeMainLayout: React.FC = () => {
  const location = useLocation()

  const outlet = useOutlet()
  const mapRef = useRef<Record<string, ReactNode>>({})
  mapRef.current[location.pathname] = outlet

  const transitions = useTransition(location.pathname, {
    from: {
      transform: location.pathname === '/welcome/1'
        ? 'translateX(0%)'
        : 'translateX(100%)',

    },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 },
  })

  return transitions((style, pathname) => (
    <animated.div key={pathname} style={style}>
      <div style={{ textAlign: 'right' }}>
        {mapRef.current[pathname]}
      </div>
    </animated.div>
  ))
}
