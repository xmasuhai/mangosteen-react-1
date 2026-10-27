import { SvgIcon } from "@/components/SvgIcon"
import { cn } from "cn"

interface Props {
  className?: string
}

export const InLoading: React.FC<Props> = ({ className, }) => {
  return (
    <div flex justify-center items-center animate-spin>
      <SvgIcon
        name="loading"
        className={cn(
          'size-[5em]',
          'animate-rainbow color-[var(--vp-c-brand-next)]',
          className,
        )} />
    </div>
  )
}
