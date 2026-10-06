import pig from '@/assets/icons/pig.svg'
import add from '@/assets/icons/add.svg'
import { cn } from 'cn'
import useSWR from 'swr'
import { request } from '@/lib/request/request'
import type { Item, Resource, Resources, ResponseData, User } from '@/global'
import { Navigate } from 'react-router-dom'
import { useTitle } from '@/hooks/useTitle'

interface Props {
  title?: string
}

export const Home: React.FC<Props> = ({ title }) => {
  useTitle(title ?? '记账首页')

  const { data: meData, /* error: meError, */ isLoading: isLoadingMe } = useSWR('/api/v1/me', async path =>
    (await request.get<ResponseData<Resource<User>>>(path))?.data?.data)
  const { data: itemsData, /* error: itemsError, */ isLoading: isLoadingItems } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await request.get<ResponseData<Resources<Item>>>(path))?.data?.data)

  if (isLoadingMe || isLoadingItems) { return <div text-6xl>加载中...</div> }

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

      <button
        className={cn(
          'w-56px h-56px',
          'bg-[var(--button-primary-color)] rounded-full',
          'text-[var(--button-primary-text-color)] text-6xl',
          'p-4px text-center flex place-content-center place-items-center-safe',
          'fixed bottom-.5em right-.5em',
        )}>
        <img src={add} alt="add" max-w="80%" max-h="80%" translate-y="-3px" />
      </button>
    </main>
  )
}
