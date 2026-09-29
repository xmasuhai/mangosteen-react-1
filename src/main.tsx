import { ErrorPage } from '@/components/ErrorPage'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
    errorElement: (<ErrorPage />),
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
]

const router = createBrowserRouter(routes)

// const div = document.getElementById('root') as HTMLElement
const div = document.getElementById('root')

const root = ReactDOM.createRoot(div!)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
