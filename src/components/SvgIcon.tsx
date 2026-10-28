import { cn } from "cn"
import React from "react"

interface Props {
  name: string
  className?: string
  onClick?: (e: React.MouseEvent | React.TouchEvent) => void
}

export const SvgIcon: React.FC<Props> = ({ name, className, onClick }: Props) => {
  return (
    <svg
      onClick={onClick}
      className={cn(
        'where:(w-1.2em h-1.2em fill-current-color)',
        className,
      )} >
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}
