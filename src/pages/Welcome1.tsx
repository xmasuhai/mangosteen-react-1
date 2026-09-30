import { NavLink } from 'react-router-dom'
import s from './Welcome1.module.scss'

export const Welcome1: React.FC = () => {
  return (
    <div className={s.wrapper}>
      Welcome1
      <NavLink to="/welcome/2">下一页</NavLink>
    </div>
  )
}
