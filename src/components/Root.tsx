import { useLocalStore } from '@/stores/useLocalStore'
import { Navigate } from 'react-router-dom'

export const Root: React.FC = () => {
  const { hasReadWelcome } = useLocalStore()
  return <Navigate to={hasReadWelcome ? '/home' : '/welcome/1'} />
}
