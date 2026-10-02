import { animated, useTransition } from '@react-spring/web'
import { useRef } from 'react'
import { NavLink, useLocation, useOutlet } from 'react-router-dom'
import logo from '@/assets/icons/mangosteen.svg'
import { cn } from 'cn'

export const WelcomeMainLayout: React.FC = () => {
  const location = useLocation()
  // 1. 获取当前的子路径（例如: "1", "2" 等）
  const currentPath = location.pathname.split('/').pop() || '1'
  // 获取当前的 outlet
  const currentOutlet = useOutlet() as React.ReactElement
  // 2. 用 ref 记录上一次的路径，用来判断是“前进”还是“后退”
  const prevPathRef = useRef(currentPath)
  const direction = Number(currentPath) > Number(prevPathRef.current)
    ? 'forward'
    : 'backward'
  prevPathRef.current = currentPath

  // 3. 根据方向动态设置动画的初始位置和退出位置
  const transitions = useTransition(currentPath, {
    from: {
      opacity: 0,
      transform: direction === 'forward'
        ? 'translate3d(-100%, 0, 0)'
        : 'translate3d(100%, 0, 0)',
      // position: 'absolute' as const,
      width: '100%',
      height: '100%',
    },
    enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)' },
    leave: {
      opacity: 0,
      transform: direction === 'forward'
        ? 'translate3d(100%, 0, 0)'
        : 'translate3d(-100%, 0, 0)',
    },
    keys: pathname => pathname,
    // 物理参数微调：让过渡更轻快
    config: { tension: 280, friction: 30 },
  })

  return (
    <div className={cn(
      'relative w-screen h-screen overflow-hidden',
      'flex flex-col justify-center items-stretch',
      'bg-[#5f34bf]',
    )}>
      <header
        className="mt-[4em]"
        shrink-0
        text-center
        flex
        flex-col
        items-center>
        <img alt="logo" src={logo} w-64px h-64px />
        <h1 className="text-[#d4d4ee] text-[2em]">山竹记账</h1>
      </header>

      <main
        className={cn(
          'relative flex grow-1 shrink-1',
          'bg-white m-[16px] rounded-[8px]',
          'mb-64px',
        )}>
        {transitions((style, pathname) => (
          <animated.div
            key={pathname}
            style={style}
            className="flex grow-1 shrink-1  bg-white rounded-[8px]">
            {currentOutlet}
          </animated.div>
        ))}
      </main>

      <section
        className={cn(
          'absolute fixed right-[0.5em] top-[0.25em]',
          'text-[#d4d4ee] text-[1.5em]',
        )}>
        <NavLink to="/welcome/1">跳过</NavLink>
      </section>
    </div>
  )
}
