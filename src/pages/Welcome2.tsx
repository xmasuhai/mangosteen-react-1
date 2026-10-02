import { NavLink } from 'react-router-dom'
import clock from '@/assets/icons/clock.svg'

export const Welcome2: React.FC = () => {
  return (
    <div className="grow-1 flex flex-col items-center justify-around">
      <img alt="pig" src={clock} className="mt-[25%]" />
      <article>
        <h2 className="text-center flex flex-col items-center text-[2em]">
          <p>每日提醒</p>
          <p>不会遗漏每一笔账单</p>
        </h2>
      </article>
      <section className="text-[var(--primary-color)] mb-[84px] text-[2em] font-bold">
        <NavLink to="/welcome/3">下一页</NavLink>
      </section>
    </div>
  )
}
