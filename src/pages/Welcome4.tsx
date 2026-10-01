import { NavLink } from 'react-router-dom'
import '@/pages/Welcome4.scoped.scss'

export const Welcome4: React.FC = () => {
  return (
    <div className="wrapper">
      <header className="title">welcome 4</header>
      <main className="card">
        第四页
      </main>
      <footer className="link">
        <NavLink to="/welcome/1">开始记账</NavLink>
      </footer>
      <style lang="scss" scoped>
        {`
          .link {
            border: 1px solid #4f46e5;
            font-size: 2rem;
            color: orangered;
          }
        `}
      </style>
    </div>

  )
}
