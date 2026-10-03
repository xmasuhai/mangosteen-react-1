import { NavLink } from 'react-router-dom'
import cloud from '@/assets/icons/cloud.svg'

export const Welcome4: React.FC = () => {
  return (
    <div className="grow-1 flex flex-col items-center justify-around">
      <img alt="pig" src={cloud} className="mt-[25%]" />
      <article>
        <h2 className="text-center flex flex-col items-center text-[2em]">
          <p>云备份</p>
          <p>再也不怕数据丢失</p>
        </h2>
      </article>
      <section className="text-[var(--primary-color)] mb-[84px] text-[2em] font-bold">
        <NavLink to="/welcome/1">开启应用</NavLink>
      </section>
    </div>
  )
}
