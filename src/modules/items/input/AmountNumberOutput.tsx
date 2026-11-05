import { cn } from "cn";

interface Props {
  className?: string
}

export const AmountNumberOutput: React.FC<Props> = ({ className, }) => {
  return (
    <span className={cn(
      'text-[24px] font-mono color-[var(--amount-text-color)]',
      className,
    )}>
      123456789.01
    </span>
  )
}
