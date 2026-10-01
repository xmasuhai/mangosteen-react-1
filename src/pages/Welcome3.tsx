import { cn } from 'cn'
import { NavLink } from 'react-router-dom'

export const Welcome3: React.FC = () => {
  return (
    <div className={cn('frank', 'bg-amber')} flex h-full justify-center items-center>
      <header hover:bg-cyan w-100px b-3 b-red h-40px>welcome 3</header>
      <main
        className="after:content-['behind'] before:content-['hi']"
        before:b-5
        before:b-red
        after:absolute
        after:b-2
        after:b-red
        grow-1
        b-5
        b-blue
        h-100px>
        第三页
      </main>
      <footer w-210px b-4 b-green h-55px>
        <NavLink to="/welcome/4">下一页</NavLink>
      </footer>
    </div>
  )
}
