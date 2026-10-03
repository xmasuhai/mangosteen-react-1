import { NavLink } from 'react-router-dom'
import chart from '@/assets/icons/chart.svg'

export const Welcome3: React.FC = () => {
  return (
    <div className="h-[100%] overflow-clip flex flex-col justify-around items-center">
      <img alt="chart" src={chart} w-130px h-108px className="translate-y-[80%]" />
      <article>
        <h2 className="text-center flex flex-col items-center text-[2em]">
          <p>数据可视化 </p>
          <p> 收支一目了然 </p>
        </h2>
      </article>
      <section className="text-[var(--primary-color)] text-[2em] font-bold translate-y-[-100%]">
        <NavLink to="/welcome/4"> 下一页 </NavLink>
      </section>
    </div>
  )
}
