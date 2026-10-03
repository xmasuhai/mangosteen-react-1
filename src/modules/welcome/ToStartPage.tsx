import { cn } from 'cn'
import { NavLink } from 'react-router-dom'

export const ToStartPage: React.FC = () => (
  <section
    className={cn(
      'fixed right-[0.5em] top-[0.25em]',
      'text-[#d4d4ee] text-[1.5em]',
    )}>
    <NavLink to="/welcome/1">跳过</NavLink>
  </section>
)
