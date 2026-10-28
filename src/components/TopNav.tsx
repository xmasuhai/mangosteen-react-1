import { SvgIcon } from "@/components/SvgIcon"
import { MenuContext } from "@/pages/ItemsPage"
import { cn } from "cn"
import { useContext } from "react"

interface Props {
  title?: string
  className?: string
}

export const TopNav: React.FC<Props> = ({ title = '山竹记账', className }) => {
  const { setVisible } = useContext(MenuContext)
  return (
    <div
      className={cn(
        'h-64px pt-24px pb-.5em px-24px text-white flex items-center gap-x-1em',
        className,
      )}>
      <SvgIcon name="menu" className="size-[2em]" onClick={() => setVisible(true)} />
      <h1 className="text-[2em]">{title}</h1>
    </div>
  )
}
