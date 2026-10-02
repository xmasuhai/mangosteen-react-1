import { NavLink } from 'react-router-dom'
import chart from '@/assets/icons/chart.svg'

export const Welcome3: React.FC = () => {
  return (
    <div className="grow-1 flex flex-col items-center justify-around">
      <img alt="pig" src={chart} className="mt-[25%]" />
      <article>
        <h2 className="text-center flex flex-col items-center text-[2em]">
          <p>数据可视化</p>
          <p>收支一目了然</p>
        </h2>
      </article>
      <section className="text-[var(--primary-color)] mb-[84px] text-[2em] font-bold">
        <NavLink to="/welcome/4">下一页</NavLink>
      </section>
    </div>
  )
}
