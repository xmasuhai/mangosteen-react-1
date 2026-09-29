import { RedirectToWelcome1 } from '@/components/RedirectToWelcome1'
import { Outlet } from 'react-router-dom'

export const routes = [
  {
    path: '/',
    errorElement: (<RedirectToWelcome1 />),
    children: [
      { index: true, element: (<div>root</div>) },
      {
        path: 'welcome',
        element: (<Outlet />),
        children: [
          { index: true, element: <div>welcome root</div> },
          { path: '1', element: <div>welcome 1</div> },
          { path: '2', element: <div>welcome 2</div> },
          { path: '3', element: <div>welcome 3</div> },
          { path: '4', element: <div>welcome 4</div> },
        ],

      },
    ],
  },
]
