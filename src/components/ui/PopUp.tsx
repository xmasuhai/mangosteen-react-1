import { OverlayMask } from "@/components/menu/OverlayMask";
import { animated, useSpring } from "@react-spring/web";
import { cn } from "cn";

interface Props {
  className?: string
  visible: boolean
  onClickMask?: () => void
}

export const PopUp: React.FC<Props> = ({ className, visible, onClickMask, }) => {
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
    <div className={cn(
      'z-[var(--z-popup)]',
      className,
    )}>
      {/* 遮罩层 */}
      <OverlayMask
        visible={visible}
        onClickMask={onClickMask}
        className="bg-black:50" />

      {/* 内容 */}
      <animated.div
        style={menuStyle}
        className={cn(
          'fixed bottom-0 left-0 w-full min-h-300px bg-red',
          'z-[calc(var(--z-popup)+1)]',
        )}>
        visible {`${visible}`}
      </animated.div>
    </div>
  )
}
