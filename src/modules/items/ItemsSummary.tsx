import { cn } from "cn"

interface Props {
  startDate: string
  endDate: string
}

export const ItemsSummary: React.FC<Props> = ({
  // startDate,
  // endDate
}) => {
  return (
    <ul className={cn(
      'bg-[var(--total-bg)] text-[var(--total-text)]',
      'grow-0 shrink-0 flex justify-between items-center',
      'm-1em py-0 px-1em rounded-[var(--button-radius)]',
      'children:(p-[1em] flex flex-col text-center)',
    )}>
      <li className="color-[var(--total-income)]">
        <span>收入</span>
        <span>¥ 128.00</span>
      </li>
      <li className="color-[var(--total-expenses)]">
        <span>支出</span>
        <span>¥ 99.00</span>
      </li>
      <li className="color-[var(--total-text)]">
        <span>净收入</span>
        <span>¥ 39.00</span>
      </li>
    </ul>
  )
}
