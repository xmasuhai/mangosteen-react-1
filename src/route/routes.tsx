import { NotFoundPage } from '@/pages/NotFoundPage'
import { MainLayout } from '@/layouts/MainLayout'
import { welcomeRouter } from '@/route/welcomeRouter'
import type { RouteObject } from 'react-router-dom'
// import { redirect } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/home',
    element: (<div>home</div>),
  },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: (<NotFoundPage />),
    // loader: () => redirect('/welcome/1'),
    children: [welcomeRouter],
  },
  // welcomeRouter,
]
