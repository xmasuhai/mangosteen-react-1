import { Root } from '@/components/Root'
import { Home } from '@/pages/Home'
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
    element: <div>items</div>,
  },
]
