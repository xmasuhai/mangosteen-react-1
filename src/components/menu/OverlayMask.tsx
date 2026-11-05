import { animated, useSpring } from "@react-spring/web"
import { cn } from "cn"

interface Props {
  className?: string
  visible?: boolean
  onClickOverlay?: () => void
}

export const OverlayMask: React.FC<Props> = ({ className, visible, onClickOverlay, }) => {
  const maskAnimeStyle = useSpring({
    opacity: visible ? 1 : 0,
    visibility: visible ? 'visible' : 'hidden',
  })
  return (
    <animated.div
      style={maskAnimeStyle}
      onClick={onClickOverlay}
      className={cn(
        'overlay-mask',
        'fixed top-0 left-0 w-screen h-screen',
        'bg-[var(--overlay-mask-bg)] z-[var(--z-float-overlay)]',
        className,
      )}>
    </animated.div>
  )
}
