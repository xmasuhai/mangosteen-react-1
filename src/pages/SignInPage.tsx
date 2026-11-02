import { GradientBanner } from "@/components/GradientBanner"
import { SvgIcon } from "@/components/SvgIcon"
import { TopNav } from "@/components/TopNav"
import { request } from "@/lib/request/request";
import {  FormRules, hasError, } from "@/lib/validator/formValidate";
import { SignInFormData, useSignInStore } from "@/stores/useSignInStore";
import { cn } from "cn"
import { FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string
}

const signInRules: FormRules<SignInFormData> = [
  { key: 'email', type: 'required', required: true, message: '请输入邮箱地址', },
  { key: 'email', type: 'pattern', regexp: /^.+@.+$/, message: '邮箱地址格式不正确', },
  { key: 'code', type: 'required', required: true, message: '请输入验证码', },
  { key: 'code', type: 'length', min: 6, max: 6, message: '请输入六位证码', },
]

export const SignInPage: React.FC<Props> = ({ /* className, */ }) => {
  const Icon = (<SvgIcon name="back-arrow" className="" />)

  const { data, setData, error, clearError, revalidateFormItems } = useSignInStore()

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

  const nav = useNavigate()
  const onSubmit: FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault()
    revalidateFormItems<SignInFormData>(data, signInRules)
    if (!hasError(error)) {
      await request.post('/api/v1/session', data)
      // TODO
      // 保存 JWT 作为登录凭证
      nav('/home')
    }
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

      {/* 表单 */}
      <form onSubmit={onSubmit} className="form-sc">
        {/* 邮箱 */}
        <section>
          <label htmlFor="email" className="form-label-sc">
            邮箱地址：
            {(
              error.email &&
                <span className="vertical-mid color-[var(--error-color)] text-.75em">{error.email.join('，')}</span>
            )}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={onChangeEmail}
            onBlur={() => revalidateFormItems<SignInFormData>({ email: data.email }, signInRules, error)}
            onFocus={() => clearError('email')}
            placeholder="请输入邮箱，然后点击发送验证码"
            className="form-input-text-sc" />
        </section>

        {/* 验证码 */}
        <section>
          <label htmlFor="sms-code" className="form-label-sc">
            验证码：
            {(
              error.code &&
              <span className="vertical-mid color-[var(--error-color)] text-.75em">{error.code.join('，')}</span>
            )}
          </label>
          <div className="flex w-full gap-x-[1em]">
            <input
              type="text"
              id="sms-code"
              value={data.code}
              onChange={onChangeCode}
              onBlur={() => revalidateFormItems<SignInFormData>({ code: data.code }, signInRules, error)}
              onFocus={() => clearError('code')}
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
