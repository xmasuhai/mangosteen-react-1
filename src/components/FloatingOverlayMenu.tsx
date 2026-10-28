import { MenuList } from "@/components/menu/MenuList"
import { OverlayMask } from "@/components/menu/OverlayMask"
import { UserHeader } from "@/components/menu/UserHeader"
import { cn } from "cn"

export const FloatingOverlayMenu: React.FC = () => {
  return (
    <>
      <div
        className={cn(
          'fixed top-0 left-0',
          'w-70vw max-w-20em h-screen',
          'flex flex-col',
          'z-[var(--z-menu)]',
        )}>
        <UserHeader className="grow-0 shrink-0" />
        <MenuList className="grow-1 shrink-1" />
      </div>
      <OverlayMask />
    </>
  )
}
