import { cn } from "cn"

export const FloatingOverlayMenu: React.FC = () => {

  return (
    <div
      className={cn(
        'fixed top-0 left-0',
        'b-1 b-solid b-red bg-red',
      )}>
      FloatingOverlayMenu
    </div>
  )
}