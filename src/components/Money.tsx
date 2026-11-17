import { cn } from 'cn'

interface Props {
  className?: string
  children?: React.ReactNode
  amount?: number
  moneySign?: string
  unit?: string
}

export const Money: React.FC<Props> = ({
  className,
  children,
  amount = 0,
  moneySign = '¥',
  unit,
}) => {
  return children ? (
    <span>{children}</span>
  ) : (
    <span className={cn(className, 'font-600 color-[var(--amount-bold-color)]')}>
      <span className="pr-.5em">{moneySign}</span>
      <span>{amount / 100}</span>
      <span>{unit}</span>
    </span>
  )
}
