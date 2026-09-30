import { animated, useTransition } from '@react-spring/web'
import { useRef } from 'react'
import { Outlet, useLocation, useOutlet } from 'react-router-dom'

export const WelcomeMainLayout: React.FC = () => {
  const location = useLocation()
  const currentOutlet = useOutlet() as React.ReactElement
  // 1. 获取当前的子路径（例如: "1", "2" 等）
  const currentPath = location.pathname.split('/').pop() || '1'
  // 2. 用 ref 记录上一次的路径，用来判断是“前进”还是“后退”
  const prevPathRef = useRef(currentPath)
  const direction = Number(currentPath) > Number(prevPathRef.current) ? 'forward' : 'backward'
  prevPathRef.current = currentPath

  // 3. 根据方向动态设置动画的初始位置和退出位置
  const transitions = useTransition(currentPath, {
    from: {
      opacity: 0,
      transform: direction === 'forward' ? 'translate3d(-100%, 0, 0)' : 'translate3d(100%, 0, 0)',
      position: 'absolute' as const,
      width: '100%',
      height: '100%',
    },
    enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)' },
    leave: {
      opacity: 0,
      transform: direction === 'forward' ? 'translate3d(100%, 0, 0)' : 'translate3d(-100%, 0, 0)',
    },
    // 物理参数微调：让过渡更轻快
    config: { tension: 280, friction: 30 },
  })

  window.console.log('WelcomeMainLayout_______________________')
  window.console.log('✌️location --->', location)
  window.console.log('✌️currentOutlet --->', currentOutlet)
  window.console.log('currentPath --->', currentPath)
  window.console.log('prevPathRef --->', prevPathRef)
  window.console.log('direction --->', direction)
  window.console.log('_______________________WelcomeMainLayout')

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    }}
    >
      {transitions((style, item) => (
        // style 必须作用在 animated.div 上
        <animated.div style={style}>
          <div className="welcome-page-wrapper" style={{ width: '100%', height: '100%' }}>
            {/* 核心：这里直接渲染当前的 outlet 即可 */}
            <Outlet />
            {window.console.log('item', item)}
          </div>
        </animated.div>
      ))}
    </div>
  )
}
