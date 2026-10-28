import { Root } from '@/components/Root'
import { Home } from '@/pages/Home'
import { ItemsPage } from '@/pages/ItemsPage'
import { welcomeRouter } from '@/route/welcomeRouter'
import type { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/home',
    element: <Home title="首页" />,
  },
  welcomeRouter,
  {
    path: '/items',
    element: <ItemsPage />,
  },
  { path: '/sign_in', element: <div>sign in</div>},
  { path: '/statistics', element: <div>统计图表</div>},
  { path: '/export', element: <div>敬请期待</div>},
  { path: '/notify', element: <div>敬请期待</div>},
  { path: '/tags', element: <div>标签</div>},
  { path: '/tech_stack', element: <div>敬请期待</div>},
]
