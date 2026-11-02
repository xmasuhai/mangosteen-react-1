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

      {/* logo */}
      <section className="text-center pt-[40px] pb-[1em]">
        <SvgIcon name="mangosteen" className="inline w-[64px] h-[68px]" />
        <h1 className="text-[2em] color-[var(--app-name-text)] font-bold">山竹记账</h1>
      </section>

      {/* 表单 */}
      <form className="form-sc">
        {/* 邮箱 */}
        <section form-label-sc>
          <label htmlFor="email" className="block text-[0.8em] mb-[0.5em]">邮箱地址</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="请输入邮箱，然后点击发送验证码"
            className="form-input-text-sc" />
        </section>

        {/* 验证码 */}
        <section form-label-sc>
          <label htmlFor="sms-code" className="block text-[0.8em] mb-[0.5em]">验证码</label>
          <div className="flex w-full">
            <input type="text" placeholder="六位数字" className="form-input-text-sc w-[9em]" />
            <button type="button" className="grow-1 ml-[1em] form-btn-sc">发送验证码</button>
          </div>
        </section>

        {/* 登录 */}
        <section className="form-label-sc mt-[100px]">
          <button type="submit" className="primary-btn">登录</button>
        </section>

      </form>

    </div>
  )
}
