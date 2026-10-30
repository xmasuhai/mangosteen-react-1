import { SvgIcon } from "@/components/SvgIcon"
import { cn } from "cn"

interface Props {
  className?: string
  message?: string
  direction?: 'vertical' | 'horizontal',
  hasRainbow?: boolean
}

export const InLoading: React.FC<Props> = ({
  direction = 'vertical',
  className,
  message,
  hasRainbow  = true,

}) => {
  return (
    <div className={cn(
      'flex items-center justify-center max-h-[10em] ',
      direction === 'horizontal' ? 'flex-row' : 'flex-col',
      hasRainbow ? 'animate-rainbow' : '',
    )}>
      <SvgIcon
        name="loading"
        className={cn(
          'where:(size-[5em]) animate-spin',
          'fill-[var(--vp-c-brand-next)]',
          className,
        )} />
      <p
        className="where:(p-[1em] text-lg color-[var(--vp-c-brand-next)])" >
          {message ?? '加载中……'}
        </p>
    </div>
  )
}
