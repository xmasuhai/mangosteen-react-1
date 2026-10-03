import { NotFoundPage } from '@/pages/NotFoundPage'
import { WelcomeMainLayout } from '@/layouts/WelcomeMainLayout'
import { Welcome1 } from '@/pages/Welcome1'
import { Welcome2 } from '@/pages/Welcome2'
import { Welcome3 } from '@/pages/Welcome3'
import { Welcome4 } from '@/pages/Welcome4'
import type { RouteObject } from 'react-router-dom'

export const welcomeRouter: RouteObject = {
  path: '/welcome/',
  element: <WelcomeMainLayout />,
  errorElement: <NotFoundPage />,
  children: [
    { path: '1', element: (<Welcome1 />) },
    { path: '2', element: (<Welcome2 />) },
    { path: '3', element: (<Welcome3 />) },
    { path: '4', element: (<Welcome4 />) },
  ],
}
