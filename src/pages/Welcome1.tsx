import { NavLink } from 'react-router-dom'
import pig from '@/assets/icons/pig.svg'

export const Welcome1: React.FC = () => {
  return (
    <div className="grow-1 flex flex-col items-center justify-around">
      <img alt="pig" src={pig} className="mt-[25%]" />
      <article>
        <h2 className="text-center flex flex-col items-center text-[2em]">
          <p>会挣钱</p>
          <p>还要会省钱</p>
        </h2>
      </article>
      <section className="text-[var(--primary-color)] mb-[84px] text-[2em] font-bold">
        <NavLink to="/welcome/2">下一页</NavLink>
      </section>
    </div>
  )
}
