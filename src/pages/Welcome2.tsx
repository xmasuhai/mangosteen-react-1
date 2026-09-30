import { NavLink } from 'react-router-dom'

export const Welcome2: React.FC = () => {
  return (
    <div style={{ border: '8px solid purple', height: '100%', display: 'flex', placeItems: 'center', justifyContent: 'center' }}>
      welcome 2
      <NavLink to="/welcome/3">下一页</NavLink>
    </div>
  )
}
