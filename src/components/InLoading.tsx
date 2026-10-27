import { SvgIcon } from "@/components/SvgIcon"
import { cn } from "cn"

interface Props {
  className?: string
  message?: string
}

export const InLoading: React.FC<Props> = ({ className, message, }) => {
  return (
    <div className="flex flex-col items-center justify-center max-h-[10em] animate-rainbow">
      <SvgIcon
        name="loading"
        className={cn(
          'size-[5em] animate-spin',
          'fill-[var(--vp-c-brand-next)]',
          className,
        )} />
      <p
        className="p-[1em] text-lg color-[var(--vp-c-brand-next)]" >
          {message ?? '加载中……'}
        </p>
    </div>
  )
}
