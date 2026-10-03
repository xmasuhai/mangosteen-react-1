import { NavLink } from 'react-router-dom'
import clock from '@/assets/icons/clock.svg'

export const Welcome2: React.FC = () => {
  return (
    <div className="h-[100%] overflow-clip flex flex-col justify-around items-center">
      <img alt="clock" src={clock} w-128px h-150px className="translate-y-[50%]" />
      <article>
        <h2 className="text-center flex flex-col items-center text-[2em]">
          <p>每日提醒</p>
          <p>不会遗漏每一笔账单</p>
        </h2>
      </article>
      <section className="text-[var(--primary-color)] text-[2em] font-bold translate-y-[-100%]">
        <NavLink to="/welcome/3">下一页</NavLink>
      </section>
    </div>
  )
}
