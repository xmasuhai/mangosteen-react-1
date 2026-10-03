import { NavLink } from 'react-router-dom'
import pig from '@/assets/icons/pig.svg'

export const Welcome1: React.FC = () => {
  return (
    <div className="h-[100%] overflow-clip flex flex-col justify-around items-center">
      <img alt="pig" src={pig} w-128px h-130px className="translate-y-[50%]" />
      <article>
        <h2 className="text-center flex flex-col items-center text-[2em]">
          <p>会挣钱</p>
          <p>还要会省钱</p>
        </h2>
      </article>
      <section className="text-[var(--primary-color)] text-[2em] font-bold translate-y-[-100%]">
        <NavLink to="/welcome/2">下一页</NavLink>
      </section>
    </div>
  )
}
