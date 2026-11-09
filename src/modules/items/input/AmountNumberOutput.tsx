import { useNumpadAmountStore } from '@/stores/useNumpadAmountStore'
import { cn } from 'cn'

interface Props {
  className?: string
}

export const AmountNumberOutput: React.FC<Props> = ({ className }) => {
  const { amount } = useNumpadAmountStore()
  return (
    <span className={cn('text-[24px] font-mono color-[var(--amount-text-color)]', className)}>
      {amount}
    </span>
  )
}
