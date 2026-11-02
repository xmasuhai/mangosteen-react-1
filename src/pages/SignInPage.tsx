import { GradientBanner } from "@/components/GradientBanner"
import { SvgIcon } from "@/components/SvgIcon"
import { TopNav } from "@/components/TopNav"
import { formValidate } from "@/lib/validator/formValidate";
import { useSignInStore } from "@/stores/useSignInStore";
import { cn } from "cn"
import { FormEventHandler } from "react";

interface Props {
  className?: string
}

export const SignInPage: React.FC<Props> = ({ /* className, */ }) => {
  const Icon = (<SvgIcon name="back-arrow" className="" />)

  const { data, setData, error, setError, clearError } = useSignInStore()

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      email: e.target.value,
    })
  }

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      code: e.target.value,
    })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    clearError()
    const error = formValidate(data, [
      {key: 'email', type: 'required', required: true, message: '请输入邮箱地址',},
      {key: 'email', type: 'pattern', regexp: /^.+@.+$/, message: '邮箱地址格式不正确',},
      {key: 'code', type: 'required', required: true, message: '请输入验证码',},
      {key: 'code', type: 'length', min: 6, max: 6, message: '请输入六位证码',},
    ])
    setError(error)

    console.log('onSubmit_______________________')
    console.log('%c⧭ data', 'color: #731d1d', data);
    console.log('%c⧭ error', 'color: #731d1d', error);
    console.log('_______________________onSubmit')
  }

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

      <div className="border b-solid b-red">{ JSON.stringify(data) }</div>

      {/* 表单 */}
      <form onSubmit={onSubmit} className="form-sc">
        {/* 邮箱 */}
        <section form-label-sc>
          <label htmlFor="email" className="vertical-mid block text-[0.8em] mb-[0.5em]">
            邮箱地址：
            {(
              error.email &&
                <span className="color-[var(--error-color)]">{error.email.join('，')}</span>
            )}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={onChangeEmail}
            placeholder="请输入邮箱，然后点击发送验证码"
            className="form-input-text-sc" />
        </section>

        {/* 验证码 */}
        <section form-label-sc>
          <label htmlFor="sms-code" className="vertical-mid block text-[0.8em] mb-[0.5em]">
            验证码：
            {(
              error.code &&
              <span className="color-[var(--error-color)]">{error.code.join('，')}</span>
            )}
          </label>
          <div className="flex w-full gap-x-[1em]">
            <input
              type="text"
              value={data.code}
              onChange={onChangeCode}
              placeholder="六位数字"
              className="form-input-text-sc w-[9em]" />
            <button type="button" className="grow-1 form-btn-sc">发送验证码</button>
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
