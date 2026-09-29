import { RedirectToWelcome1 } from '@/components/RedirectToWelcome1'
import { NavLink, Outlet } from 'react-router-dom'

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
          {
            path: '1',
            element: (
              <div>
                welcome 1
                <NavLink to="/welcome/2">下一页</NavLink>
              </div>
            ),
          },
          {
            path: '2',
            element: (
              <div>
                welcome 2
                <NavLink to="/welcome/3">下一页</NavLink>
              </div>
            ),
          },
          {
            path: '3',
            element: (
              <div>
                welcome 3
                <NavLink to="/welcome/4">下一页</NavLink>
              </div>
            ),
          },
          {
            path: '4',
            element: (
              <div>
                welcome 4
                <NavLink to="/welcome/1">下一页</NavLink>
              </div>
            ),
          },
        ],
      },
    ],
  },
]
