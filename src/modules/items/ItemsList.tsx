import { Item, Resources, ResponseData } from "@/global"
import { request } from "@/lib/request/request"
import { cn } from "cn"
import useSWRInfinite from "swr/infinite"

interface Props {
  startDate: string
  endDate: string
}

export const ItemsList: React.FC<Props> = ({
  // startDate,
  // endDate,
}) => {
  // SWR key
  const getKey = (pageIndex: number = 0) => `/api/v1/items?page=${pageIndex + 1}`
  const { data, /* error, isLoading, isValidating, mutate, size, setSize */ } = useSWRInfinite(
    getKey,
    async (path) => (await request.get<ResponseData<Resources<Item>>>(path)).data,
  )

  if (!data) {
    return (<span>还没搞定</span>)
  } else {
    console.log('ItemsSummary_______________________')
    console.log('%c⧭', 'color: #733d00', data);
    console.log('_______________________ItemsSummary')

    return (
      <ol
        className={cn(
          'accounts',
          'flex flex-col overflow-auto scrollbar-hide children:(basis-[78px] shrink-0)',
          '[&>li]:[--sibling-idx:calc(1*sibling-index())]',
          '[&>li>div:first-child]:bg-[oklch(70%_0.15_calc(var(--sibling-idx)*70))]',
        )}>
        {
          data.map(({ data: { resources, pager: _pager } }, dataIndex) => (<>
            {
              resources.map((item: Item) => (
                <li
                  key={`${dataIndex}-${item.id}`}
                  className={cn(
                    'account-item',
                    'flex justify-between items-start py-[12px] px-[1em] ',
                    'b-b-[1px] b-t-[1px] b-t-[transparent] b-b-[var(--button-border-color)]',
                  )}>
                  <div className="sign grow-0 shrink-0 size-[48px] rounded-[50%] flex justify-center items-center my-0 mx-.5em">
                    <span>😀</span>
                  </div>

                  <div className="mx-.25em grow-1 shrink-1">
                    <div className="flex justify-between">
                      <span className="text-[var(--list-tag-text)]">{item.note}</span>
                      <span className="text-[var(--list-amount-text)]">¥&nbsp;{item.amount / 100}</span>
                    </div>

                    <div className="text-[var(--list-time-text)] mt-.25em">
                      2027-01-01 12:00:00
                    </div>
                  </div>
                </li>
              ))
            }
          </>))
        }

        <li className="px-1em pt-2em mb-2em text-center">
          <button
            className={cn('primary-btn')}>
            加载更多
          </button>
        </li>
      </ol>
    )

  }

}
