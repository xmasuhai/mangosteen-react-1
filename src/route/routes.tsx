import { RedirectToWelcome1 } from '@/components/RedirectToWelcome1'
import { welcomeRouter } from '@/route/welcomeRouter'
import { redirect } from 'react-router-dom'

export const routes = [
  {
    path: '/',
    errorElement: (<RedirectToWelcome1 />),
    loader: () => redirect('/welcome/1'),
  },
  welcomeRouter,
]
