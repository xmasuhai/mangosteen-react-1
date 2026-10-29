import { Item } from "@/global"
import { cn } from "cn"

interface Props {
  items: Item[]
}

export const ItemsList: React.FC<Props> = ({ items }) => {
  return (
    <div className="item-list-wrapper max-h-[calc(100%-112px)] grow-1 shrink-1 overflow-auto scrollbar-hide">
      <ol className={cn(
        'accounts',
        '[&>li]:[--sibling-idx:calc(1*sibling-index())]',
        '[&>li>div:first-child]:bg-[oklch(70%_0.15_calc(var(--sibling-idx)*70))]',
      )}>
        {
          items
            .map(item => (
              <li
                key={item.id}
                className={cn(
                  'account-item',
                  'flex justify-between items-start',
                  'py-[12px] px-[1em] b-b-[1px] b-b-[var(--button-border-color)]',
                )}>
                <div className="sign grow-0 shrink-0 size-[48px] rounded-[50%] flex justify-center items-center my-0 mx-.5em">
                  <span>😀</span>
                </div>

                <div className="mx-.25em grow-1 shrink-1">
                  <div className="flex justify-between">
                    <span className="text-[var(--list-tag-text)]">旅行</span>
                    <span className="text-[var(--list-amount-text)]">¥1234.00</span>
                  </div>

                  <div className="text-[var(--list-time-text)] mt-.25em">
                    2027-01-01 12:00:00
                  </div>
                </div>
              </li>
            ))
        }
      </ol>

      <div className="px-[1em] pt-[2em] mb-[2em] text-center">
        <button
          className={cn('primary-btn')}>
          加载更多
        </button>
      </div>
    </div>
  )
}
