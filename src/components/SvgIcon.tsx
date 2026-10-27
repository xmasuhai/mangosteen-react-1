import { cn } from "cn"

interface Props {
  name: string
  className?: string
}

export const SvgIcon: React.FC<Props> = ({ name, className }: Props) => {
  return (
    <svg
      className={cn(
        'where:(w-1.2em h-1.2em fill-current-color)',
        className,
      )} >
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}
