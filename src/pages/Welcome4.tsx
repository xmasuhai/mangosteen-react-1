import { NavLink } from 'react-router-dom'

export const Welcome4: React.FC = () => {
  return (
    <div style={{ border: '8px solid lightblue', height: '100%', display: 'flex', placeItems: 'center', justifyContent: 'center' }}>
      welcome 4 welcome 4 welcome 4
      <NavLink to="/welcome/1">开始记账</NavLink>
    </div>
  )
}
