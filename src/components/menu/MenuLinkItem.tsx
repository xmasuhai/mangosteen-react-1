import { SvgIcon } from "@/components/SvgIcon"
import { cn } from "cn"
import { NavLink } from "react-router-dom"

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
  linkPath,
}) => {
  return (
    <li
      className={cn(
        'px-1em py-.5em mb-.25em',
        className,
      )}>
      <NavLink
        to={linkPath}
        className={cn(
          'flex items-center',
          className,
        )}>
        <SvgIcon name={iconName} className="mr-[1em] size-[2em]" />
        <span>{linkTitle}</span>
      </NavLink>
    </li>
  )
}
