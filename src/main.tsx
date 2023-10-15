import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

// const div = document.getElementById('root') as HTMLElement
const div = document.getElementById('root')

const root = ReactDOM.createRoot(div!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
