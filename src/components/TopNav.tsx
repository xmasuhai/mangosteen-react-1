import { cn } from 'cn'

interface Props {
  className?: string
  title?: string
  icon: React.ReactNode
}

export const TopNav: React.FC<Props> = ({ className, title = '山竹记账', icon }) => {
  return (
    <div
      className={cn(
        'h-64px pt-24px pb-.5em px-24px text-white flex items-center gap-x-1em',
        className
      )}>
      <span
        className={cn(
          'where:(size-24px)',
          'flex items-center justify-center',
          'children:(max-w-full max-h-full)'
        )}>
        {icon}
      </span>
      <h1 className="text-[24px]"> {title} </h1>
    </div>
  )
}
