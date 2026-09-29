import { RedirectToWelcome1 } from '@/components/RedirectToWelcome1'
import { MainLayout } from '@/layouts/MainLayout'
import { welcomeRouter } from '@/route/welcomeRouter'

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: (<RedirectToWelcome1 />),
    children: [
      welcomeRouter,
    ],
  },
]
