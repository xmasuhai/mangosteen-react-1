import { GradientBanner } from "@/components/GradientBanner";
import { SvgIcon } from "@/components/SvgIcon";
import { TopNav } from "@/components/TopNav";
import { cn } from "cn";

interface Props {
  className?: string
}

export const ItemCreatePage: React.FC<Props> = ({ /* className, */ }) => {
  const Icon = (<SvgIcon name="back-arrow" className="size-[24px]" />)

  return (
    <div className={cn('container w-screen h-screen relative')}>
      <GradientBanner>
        <TopNav icon={Icon} title="记一笔" />
      </GradientBanner>
    </div>
  )
}