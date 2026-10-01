import { NavLink } from 'react-router-dom'

export const Welcome1: React.FC = () => {
  return (
    <div className="wrapper">
      <article>
        <h2 className="slogan">
          <p>ASX</p>
          <p>TTR</p>
        </h2>
      </article>
      <section>
        <NavLink to="/welcome/2">下一页</NavLink>
      </section>
    </div>
  )
}
