import { NavLink } from 'react-router-dom'
import cloud from '@/assets/icons/cloud.svg'

export const Welcome4: React.FC = () => {
  return (
    <div className="h-[100%] overflow-clip flex flex-col justify-around items-center">
      <img alt="cloud" src={cloud} w-129px h-83px className="translate-y-[120%]" />
      <article>
        <h2 className="text-center flex flex-col items-center text-[2em]">
          <p>云备份</p>
          <p>再也不怕数据丢失</p>
        </h2>
      </article>
      <section className="text-[var(--primary-color)] text-[2em] font-bold translate-y-[-100%]">
        <NavLink to="/home">开启应用</NavLink>
      </section>
    </div>
  )
}
