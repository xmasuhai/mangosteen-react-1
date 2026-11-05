import { animated, useSpring } from "@react-spring/web"
import { cn } from "cn"
import { useState } from "react";

interface Props {
  className?: string
  visible?: boolean
  onClickMask?: () => void
}

export const OverlayMask: React.FC<Props> = ({ className, visible, onClickMask, }) => {
  const [maskVisible, setMaskVisible] = useState(visible)
  const maskAnimeStyle = useSpring({
    opacity: visible ? 1 : 0,
    onStart({ value, }) {
      if (value.opacity < 0.1) { setMaskVisible(true) }
    },
    onRest({ value, }) {
      if (value.opacity < 0.1) { setMaskVisible(false) }
    },
    visibility: maskVisible ? 'visible' : 'hidden',
  })

  return (
    <animated.div
      style={maskAnimeStyle}
      onClick={onClickMask}
      className={cn(
        'overlay-mask',
        'fixed top-0 left-0 w-screen h-screen',
        'bg-[var(--overlay-mask-bg)] z-[var(--z-float-overlay)]',
        className,
      )}>
    </animated.div>
  )
}
