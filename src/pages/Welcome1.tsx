import { NavLink } from 'react-router-dom'

export const Welcome1: React.FC = () => {
  return (
    <div style={{ border: '8px solid red', height: '100%', display: 'flex', placeItems: 'center', justifyContent: 'center' }}>
      welcome 1
      <NavLink to="/welcome/2">下一页</NavLink>
    </div>
  )
}
