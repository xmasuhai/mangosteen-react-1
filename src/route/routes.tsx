import { RedirectToWelcome1 } from '@/components/RedirectToWelcome1'
import { MainLayout } from '@/layouts/MainLayout'
import { welcomeRouter } from '@/route/welcomeRouter'
import { redirect } from 'react-router-dom'

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: (<RedirectToWelcome1 />),
    loader: () => redirect('/welcome/1'),
  },
  welcomeRouter,
]
