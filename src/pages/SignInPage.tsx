import { GradientBanner } from "@/components/GradientBanner"
import { SvgIcon } from "@/components/SvgIcon"
import { TopNav } from "@/components/TopNav"
import { cn } from "cn"

interface Props {
  className?: string
}

export const SignInPage: React.FC<Props> = ({ /* className, */ }) => {

  const Icon = (<SvgIcon name="back-arrow" className="" />)

  return (
    <div className={cn('container w-screen h-screen relative')}>
      <GradientBanner>
        <TopNav title="登录" icon={Icon} />
      </GradientBanner>
    </div>
  )
}
