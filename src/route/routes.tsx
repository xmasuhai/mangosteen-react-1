import { Root } from '@/components/Root'
import { Home } from '@/pages/Home'
import { ItemCreatePage } from '@/pages/ItemCreatePage'
import { ItemsPage } from '@/pages/ItemsPage'
import { SignInPage } from '@/pages/SignInPage'
import { TagCreatePage } from '@/pages/TagCreatePage'
import { welcomeRouter } from '@/route/welcomeRouter'
import type { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  { path: '/', element: <Root /> },
  welcomeRouter,
  { path: '/home', element: <Home title="首页" /> },
  { path: '/sign_in', element: <SignInPage /> },
  { path: '/items', element: <ItemsPage /> },
  { path: '/items/create', element: <ItemCreatePage /> },
  { path: '/tags/create', element: <TagCreatePage /> },
  { path: '/tags', element: <div>标签</div> },
  { path: '/statistics', element: <div>统计图表</div> },
  { path: '/export', element: <div>敬请期待</div> },
  { path: '/notify', element: <div>敬请期待</div> },
  { path: '/tech_stack', element: <div>敬请期待</div> },
]
