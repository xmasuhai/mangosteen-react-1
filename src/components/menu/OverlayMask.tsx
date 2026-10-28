import { useMenuStore } from "@/stores/useMenuStore"
import { cn } from "cn"

export const OverlayMask: React.FC = () => {
  const { setVisible, } = useMenuStore()
  return (
    <div
      onClick={() => setVisible(false)}
      className={cn(
      'fixed top-0 left-0 w-screen h-screen',
      'bg-[var(--overlay-mask-bg)] z-[var(--z-index-float-overlay)]',
    )}>
    </div>
  )
}
