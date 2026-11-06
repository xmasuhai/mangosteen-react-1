import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/route/router'
import '@/main.scss'
import 'virtual:uno.css'
import 'virtual:svgsprites'
import vhCheck from 'vh-check'
vhCheck()

export const rootElement = document.getElementById('root') as HTMLElement

export const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router} />
  </React.StrictMode>,
)
