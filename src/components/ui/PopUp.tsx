import { OverlayMask } from '@/components/menu/OverlayMask'
import { animated, useSpring } from '@react-spring/web'
import { cn } from 'cn'
import s from './PopUp.module.scss'

interface Props {
  className?: string
  visible: boolean
  onClickMask?: () => void
  children?: React.ReactNode
}

export const PopUp: React.FC<Props> = ({
  className,
  visible,
  onClickMask,
  children,
}) => {
  const menuStyle = useSpring({
    transform: visible ? 'translateY(0%)' : 'translateY(100%)',
    opacity: visible ? 1 : 0,
    config: {
      tension: 200,
      friction: 20,
      duration: 180,
    },
  })

  return (
    <div className={cn('z-[var(--z-popup)] touch-none', className)}>
      {/* 遮罩层 */}
      <OverlayMask visible={visible} onClickMask={onClickMask} className="bg-black:50" />

      {/* 内容 */}
      <animated.div
        style={menuStyle}
        className={cn(
          'popup-content',
          s.popupContent,
          'fixed bottom-0 left-0 w-full bg-white',
          'z-[calc(var(--z-popup)+1)]',
          'rounded-t-[1em] overflow-hidden',
          'flex flex-col items-center justify-center',
          'children:(w-full)'
        )}>
        {/* 插槽 */}
        {children}
      </animated.div>
    </div>
  )
}
