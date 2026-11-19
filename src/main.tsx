import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/route/router'
import '@/main.scss'
import 'virtual:uno.css'
import 'virtual:svgsprites'
import vhCheck from 'vh-check'

vhCheck({
  cssVarName: 'vh-offset', // default 注入 --vh-offset
})

export const rootElement = document.getElementById('root') as HTMLElement

export const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
