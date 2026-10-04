import { Navigate } from 'react-router-dom'

export const Root: React.FC = () => {
  const hasRead = JSON.parse(localStorage.getItem('hasReadWelcome') ?? 'false')

  if (hasRead) {
    return <Navigate to="/home" />
  }
  else {
    return <Navigate to="/welcome/1" />
  }
}
