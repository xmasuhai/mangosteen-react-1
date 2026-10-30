import { InLoading } from "@/components/InLoading"
import { Item, Resources, ResponseData } from "@/global"
import { request } from "@/lib/request/request"
import { cn } from "cn"
import styled from "styled-components"
import useSWRInfinite from "swr/infinite"

interface Props {
  startDate: string
  endDate: string
}

export const ItemsList: React.FC<Props> = ({
  // startDate,
  // endDate,
}) => {
  type ResourcesData = ResponseData<Resources<Item>>
  // SWR key
  const getKey = (pageIndex: number = 0, prev: ResourcesData) => {
    if (prev) {
      const sentCount = (prev.data.pager.page - 1) * prev.data.pager.per_page + prev.data.resources.length
      const count = prev.data.pager.count
      if (sentCount >= count) { return null }
    }
    return `/api/v1/items?page=${pageIndex + 1}`
  }
  const fetcher = async (path: string) => (await request.get<ResourcesData>(path)).data
  const { data, size, setSize, error, isLoading, isValidating, /*   mutate, */ } = useSWRInfinite(
    getKey,
    (path) => fetcher(path),
  )

  const loadMore = () => { setSize(size + 1) }

  const Div = styled.div`
    padding: 16px;
    text-align: center;
  `
  const errorTip = error && (<Div className="color-[var(--error-color)]">数据加载失败，请稍后刷新页面</Div>)

  const inLoadingState = isLoading || isValidating

  console.log('ItemsSummary_______________________')
  console.log('%c⧭', 'color: #733d00', data);
  console.log('%c⧭ size', 'color: #733d00', size);
  console.log('%c⧭ isValidating', 'color: #733d00', isValidating);
  console.log('%c⧭ isLoading', 'color: #733d00', isLoading);
  console.log('_______________________ItemsSummary')

  if (!data) {
    return (
      <div className="p-1em text-center">
        {errorTip}
        {inLoadingState && (<Div>数据加载中……</Div>) }
      </div>
    )
  } else {
    const lastPageData = data?.[size - 1]
    const { page, per_page, count } = lastPageData?.data.pager ?? {}
    const hasMore = (page - 1) * per_page + lastPageData?.data.resources.length < count

    return (
      <ol
        className={cn(
          'accounts',
          'flex flex-col overflow-auto scrollbar-hide children:(basis-[78px] shrink-0)',
          '[&>li]:[--sibling-idx:calc(1*sibling-index())]',
          '[&>li>div:first-child]:bg-[oklch(70%_0.15_calc(var(--sibling-idx)*70))]',
        )}>
        {
          data.flatMap(({ data: { resources, pager: _pager } }, dataIndex) => (
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
            ))))
        }

        {errorTip}

        <li className="px-1em pt-2em mb-2em text-center">
          <button
            disabled={!hasMore || inLoadingState}
            onClick={loadMore}
            className={cn(
              'primary-btn flex items-center justify-center',
              hasMore && !inLoadingState ? '' : 'disabled',
            )}>
            {
              !hasMore && !inLoadingState
                ? '没有更多数据了'
                : inLoadingState
                  ? (<InLoading direction="horizontal" hasRainbow={false} className="size-1em flex text-1em fill-white" />)
                  : '加载更多'
            }
          </button>
        </li>
      </ol>
    )

  }

}
