import type { Item, Resources } from "@/global"
import { request } from "@/lib/request/request"
import { accountItems } from "@/mock/fake/accountItems"
import { ItemsList } from "@/modules/items/ItemsList"
import { cn } from "cn"
import { useState } from "react"
import useSWRInfinite from 'swr/infinite'

interface Props {
  startDate: string
  endDate: string
}

export const ItemsSummary: React.FC<Props> = ({
  startDate,
  endDate
}) => {
  // SWR key
  const getKey = (pageIndex: number = 0) => `/api/v1/items?page=${pageIndex + 1}`
  const { data, error, /* isLoading, isValidating, mutate, size, setSize */ } = useSWRInfinite(
    getKey,
    async (path) => (await request.get<Resources<Item[]>>(path)).data,
  )

  const [items,] = useState<Item[]>(accountItems)

  console.log('ItemsSummary_______________________')
  console.log('%c⧭', 'color: #733d00', data);
  console.log('%c%s', 'color: #e50000', error);
  console.log('_______________________ItemsSummary')

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] scrollbar-hide relative">
      {startDate}-{endDate}

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

      <ItemsList items={items}/>
    </div>
  )
}
