import { useLocalStore } from '@/stores/useLocalStore'
import { cn } from 'cn'
import { NavLink } from 'react-router-dom'

export const ToStartPage: React.FC = () => {
  const { setHasReadWelcome } = useLocalStore()
  const onSkip = () => { setHasReadWelcome(true) }

  return (
    <section
      className={cn(
        'fixed right-[0.5em] top-[0.25em]',
        'text-[#d4d4ee] text-[1.5em]',
      )}>
      <NavLink to="/home" onClick={onSkip}>跳过</NavLink>
    </section>
  )
}
