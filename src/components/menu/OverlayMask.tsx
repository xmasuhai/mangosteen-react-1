import { useMenuStore } from "@/stores/useMenuStore"
import { animated, useSpring } from "@react-spring/web"
import { cn } from "cn"

interface Props { }


export const OverlayMask: React.FC<Props> = () => {
  const { visible, setVisible, } = useMenuStore()
  const maskAnimeStyle = useSpring({
    opacity: visible ? 1 : 0,
    visibility: visible ? 'visible' : 'hidden',
    onStart(result) {
      console.log('maskAnimeStyle_______________________')
      console.log('%c%s', 'color: #aa00ff', visible);
      console.log('%c⧭', 'color: #00a3cc', result);
      console.log('%c⧭', 'color: #00a3cc', result.value);
      console.log('_______________________maskAnimeStyle')
    },
  })
  return (
    <animated.div
      style={maskAnimeStyle}
      onClick={() => setVisible(false)}
      className={cn(
        'overlay-mask',
        'fixed top-0 left-0 w-screen h-screen',
        'bg-[var(--overlay-mask-bg)] z-[var(--z-index-float-overlay)]',
      )}>
    </animated.div>
  )
}
