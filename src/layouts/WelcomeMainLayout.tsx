import { cn } from 'cn'
import { MangosteenHeader } from '@/modules/welcome/MangosteenHeader'
import { ToStartPage } from '@/modules/welcome/ToStartPage'
import { SwiperGuide } from '@/modules/welcome/SwiperGuide'

export const WelcomeMainLayout: React.FC = () => {
  return (
    <div className={cn(
      'overflow-clip',
      'bg-[#5f34bf]',
      'h-screen pb-16px',
      'flex flex-col items-stretch',
    )}>
      <MangosteenHeader />

      <SwiperGuide />

      <ToStartPage />
    </div>
  )
}
