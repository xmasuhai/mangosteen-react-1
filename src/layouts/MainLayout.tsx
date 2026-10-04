import { Navigate, Outlet } from 'react-router-dom'

export const MainLayout: React.FC = () => {
  const hasRead = JSON.parse(localStorage.getItem('hasReadWelcome') ?? 'false')

  if (hasRead) {
    return <Navigate to="/home" />
  }
  else {
    return (
      <div><Outlet /></div>
    )
  }
}
