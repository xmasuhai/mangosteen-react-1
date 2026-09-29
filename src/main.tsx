import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/route/router'

// const div = document.getElementById('root') as HTMLElement
const div = document.getElementById('root')

const root = ReactDOM.createRoot(div!)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
