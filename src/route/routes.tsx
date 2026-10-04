import { Root } from '@/components/Root'
import { welcomeRouter } from '@/route/welcomeRouter'
import type { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/home',
    element: (<div>home</div>),
  },
  welcomeRouter,
]
