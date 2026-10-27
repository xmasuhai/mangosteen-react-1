import { SvgIcon } from "@/components/SvgIcon"
import { cn } from "cn"

interface Props {
  title?: string
  className?: string
}

export const TopNav: React.FC<Props> = ({ title = '山竹记账', className }) => {
  return (
    <div
      class={cn(
        'h-64px pl-1em text-white flex items-center gap-x-1em',
        className,
      )}>
      <SvgIcon name="menu" className="size-[2em]" />
      <h1 className="text-[2em]">{title}</h1>
    </div>
  )
}
