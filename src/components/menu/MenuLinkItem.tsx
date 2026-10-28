import { SvgIcon } from "@/components/SvgIcon"
import { cn } from "cn"

interface Props {
  className?: string
  linkPath?: string
  linkTitle?: string
  iconName: string
}

export const MenuLinkItem: React.FC<Props> = ({
  className,
  iconName,
  linkTitle,
}) => {

  return (
    <li
      className={cn(
        'flex items-center px-1em py-.5em mb-.25em',
        className,
      )}>
      <SvgIcon name={iconName} className="mr-[1em] size-[2em]" />
      <span>{linkTitle}</span>
    </li>
  )
}
