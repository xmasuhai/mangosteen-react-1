import { NavLink } from 'react-router-dom'
import pig from '@/assets/icons/pig.svg'

export const Welcome1: React.FC = () => {
  return (
    <div className="wrapper">
      <img alt="pig" src={pig} />
      <article>
        <h2 className="slogan">
          <p>会挣钱</p>
          <p>还要会省钱</p>
        </h2>
      </article>
      <section>
        <NavLink to="/welcome/2">下一页</NavLink>
      </section>
    </div>
  )
}
