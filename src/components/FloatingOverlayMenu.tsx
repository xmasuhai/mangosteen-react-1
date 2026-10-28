import { MenuList } from "@/components/menu/MenuList"
import { OverlayMask } from "@/components/menu/OverlayMask"
import { UserHeader } from "@/components/menu/UserHeader"
import { useMenuStore } from "@/stores/useMenuStore"
import { animated, useSpring } from "@react-spring/web"
import { cn } from "cn"

interface Props {}

export const FloatingOverlayMenu: React.FC<Props> = () => {
  const { visible, } = useMenuStore()
  const menuStyle = useSpring({
    transform: visible ? 'translateX(0%)' : 'translateX(-100%)',
    opacity: visible ? 1 : 0,
  })
  return (
    <>
      <animated.div
        style={menuStyle}
        className={cn(
          'floating-menu',
          'fixed top-0 left-0',
          'w-70vw max-w-20em h-screen',
          'flex flex-col',
          'z-[var(--z-menu)]',
        )}>
        <UserHeader className="grow-0 shrink-0" />
        <MenuList className="grow-1 shrink-1" />
      </animated.div>

      <OverlayMask />
    </>
  )
}
