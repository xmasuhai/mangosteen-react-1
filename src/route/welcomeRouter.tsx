import { RedirectToWelcome1 } from '@/components/RedirectToWelcome1'
import { WelcomeMainLayout } from '@/layouts/WelcomeMainLayout'
import { Welcome1 } from '@/pages/Welcome1'
import { Welcome2 } from '@/pages/Welcome2'
import { Welcome3 } from '@/pages/Welcome3'
import { Welcome4 } from '@/pages/Welcome4'

export const welcomeRouter = {
  path: '/welcome/',
  element: <WelcomeMainLayout />,
  errorElement: (<RedirectToWelcome1 />),
  children: [
    { path: '1', element: (<Welcome1 />) },
    { path: '2', element: (<Welcome2 />) },
    { path: '3', element: (<Welcome3 />) },
    { path: '4', element: (<Welcome4 />) },
  ],
}
