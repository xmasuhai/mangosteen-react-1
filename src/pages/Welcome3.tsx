import { NavLink } from 'react-router-dom'

export const Welcome3: React.FC = () => {
  return (
    <div style={{ border: '8px solid lightgreen', height: '100%', display: 'flex', placeItems: 'center', justifyContent: 'center' }}>
      welcome 3
      <NavLink to="/welcome/4">下一页</NavLink>
    </div>
  )
}
