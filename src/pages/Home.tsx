import pig from '@/assets/icons/pig.svg'
import { cn } from 'cn'
import useSWR from 'swr'
import { request } from '@/lib/request/request'
import type { Item, Resource, Resources, ResponseData, User } from '@/global'
import { Navigate } from 'react-router-dom'
import { useTitle } from '@/hooks/useTitle'
import { InLoading } from '@/components/InLoading'
import { AddItemFloatButton } from '@/components/AddItemFloatButton'

interface Props {
  title?: string
}

export const Home: React.FC<Props> = ({ title }) => {
  useTitle(title ?? '记账首页')

  const { data: meData, /* error: meError, */ isLoading: isLoadingMe } = useSWR(
    '/api/v1/me',
    async (path) => (await request.get<ResponseData<Resource<User>>>(path))?.data?.data
  )
  // 为两个页面的请求设置不同的 Key 查询参数&scene=verify-不与跳转后页面相同请求互相干扰
  const getItemKey = (meData: unknown) => (meData ? '/api/v1/items?page=1&scene=verify' : null)
  const itemFetch = async (path: string) =>
    (await request.get<ResponseData<Resources<Item>>>(path))?.data
  const {
    data: itemsData,
    /* error: itemsError, */ isLoading: isLoadingItems,
    // mutate,
  } = useSWR(getItemKey(meData), itemFetch)

  if (isLoadingMe || isLoadingItems) {
    return (
      <main h-screen flex flex-col justify-center items-center>
        <InLoading className="h-screen size-[5em]" message="正在加载，请稍等..." />
      </main>
    )
  }

  if (itemsData?.data?.resources?.[0]) {
    return <Navigate to="/items" />
  }

  return (
    <main flex flex-col justify-center items-center>
      <div flex justify-center items-center>
        <img src={pig} alt="pig" w-128px h-130px mt-20vh mb-20vh block />
      </div>

      <div px-16px self-stretch>
        <button className={cn('primary-btn')}>开始记账</button>
      </div>

      <AddItemFloatButton />
    </main>
  )
}
