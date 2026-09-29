import { Outlet } from 'react-router-dom'

export const WelcomeMainLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}
