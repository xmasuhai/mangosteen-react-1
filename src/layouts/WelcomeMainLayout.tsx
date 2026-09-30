import { useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

export const WelcomeMainLayout: React.FC = () => {
  const location = useLocation()
  const currentOutlet = useOutlet()
  // 1. 获取当前的子路径（例如: "1", "2" 等）
  const currentPath = location.pathname.split('/').pop() || '1'
  // 2. 用 ref 记录上一次的路径，用来判断是“前进”还是“后退”
  const prevPathRef = useRef(currentPath)
  const direction = Number(currentPath) > Number(prevPathRef.current) ? 'forward' : 'backward'
  prevPathRef.current = currentPath

  window.console.log('WelcomeMainLayout_______________________')
  window.console.log('✌️location --->', location)
  window.console.log('✌️currentOutlet --->', currentOutlet)
  window.console.log('currentPath --->', currentPath)
  window.console.log('prevPathRef --->', prevPathRef)
  window.console.log('direction --->', direction)
  window.console.log('_______________________WelcomeMainLayout')

  return (
    <div>
      {currentOutlet}
    </div>
  )
}
