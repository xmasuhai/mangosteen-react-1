import { routes } from '@/route/routes'
import { createBrowserRouter } from 'react-router-dom'

type AppRouterType = ReturnType<typeof createBrowserRouter>

export const router: AppRouterType = createBrowserRouter(routes)
