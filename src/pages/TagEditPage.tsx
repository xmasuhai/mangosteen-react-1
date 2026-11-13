import { GradientBanner } from '@/components/GradientBanner'
import { SvgIcon } from '@/components/SvgIcon'
import { TopNav } from '@/components/TopNav'
import { TagForm } from '@/modules/tags/TagForm'
import { cn } from 'cn'

interface Props {
  className?: string
}

export const TagEditPage: React.FC<Props> = ({ className }) => {
  const Icon = <SvgIcon name="back-arrow" className="size-[24px]" />
  return (
    <div className={cn('container w-screen h-screen relative', className)}>
      <GradientBanner>
        <TopNav title="标签详情" icon={Icon} />
      </GradientBanner>

      <TagForm />
    </div>
  )
}
