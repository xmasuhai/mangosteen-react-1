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

  const { data: meData, /* error: meError, */ isLoading: isLoadingMe } = useSWR('/api/v1/me', async path =>
    (await request.get<ResponseData<Resource<User>>>(path))?.data?.data)
  const { data: itemsData, /* error: itemsError, */ isLoading: isLoadingItems } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await request.get<ResponseData<Resources<Item>>>(path))?.data?.data)

  if (isLoadingMe || isLoadingItems) { return <InLoading className="h-screen" /> }

  if (itemsData?.resources?.[0]) { return <Navigate to="/items" /> }

  return (
    <main flex flex-col justify-center items-center>
      <div flex justify-center items-center>
        <img src={pig} alt="pig" w-128px h-130px mt-20vh mb-20vh block />
      </div>

      <div px-16px self-stretch>
        <button
          w="100%"
          className={cn(
            'h-48px bg-[var(--button-primary-color)] b-none rounded-8px',
            'text-[var(--button-primary-text-color)]',
          )}>
          开始记账
        </button>
      </div>

      <AddItemFloatButton />
    </main>
  )
}
