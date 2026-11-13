import { FormItem } from '@/components/form/item/FormItem'
import { GradientBanner } from '@/components/GradientBanner'
import { SvgIcon } from '@/components/SvgIcon'
import { TopNav } from '@/components/TopNav'
import { request } from '@/lib/request/request'
import { type FormRules, hasError } from '@/lib/validator/formValidate'
import { type SignInFormData, useSignInStore } from '@/stores/useSignInStore'
import { cn } from 'cn'
import { type FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  className?: string
}

const signInRules: FormRules<SignInFormData> = [
  { key: 'email', type: 'required', required: true, message: '请输入邮箱地址' },
  { key: 'email', type: 'pattern', regexp: /^.+@.+$/, message: '邮箱地址格式不正确' },
  { key: 'code', type: 'required', required: true, message: '请输入验证码' },
  { key: 'code', type: 'length', min: 6, max: 6, message: '请输入六位证码' },
] as const

export const SignInPage: React.FC<Props> = ({ className }) => {
  const Icon = <SvgIcon name="back-arrow" className="size-[24px]" />

  const {
    data: lastData,
    error: lastError,
    setData,
    clearError,
    revalidateFormItems,
  } = useSignInStore()

  const onChangeEmail = (value: string) => {
    setData({
      ...lastData,
      email: value,
    })
  }
  const onBlurEmail = () => {
    revalidateFormItems<SignInFormData>({ email: lastData.email }, signInRules, lastError)
  }
  const onFocusEmail = () => {
    clearError('email')
  }

  const onChangeCode = (value: string) => {
    setData({
      ...lastData,
      code: value,
    })
  }
  const onBlurCode = () => {
    revalidateFormItems<SignInFormData>({ code: lastData.code }, signInRules, lastError)
  }
  const onFocusCode = () => {
    clearError('code')
  }

  const onClickSendCode = () => {}

  const nav = useNavigate()
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    revalidateFormItems<SignInFormData>(lastData, signInRules, lastError)
    // 注意过期的闭包 lastData、lastError 都是闭包，不能直接使用，需要用 useSignInStore.getState() 获取最新状态
    const freshError = useSignInStore.getState().error
    const freshData = useSignInStore.getState().data
    if (!hasError(freshError)) {
      await request.post('/api/v1/session', freshData)
      // TODO 保存 JWT 作为登录凭证
      nav('/home')
    }
  }

  return (
    <div className={cn('container w-screen h-screen relative', className)}>
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
        <FormItem
          formItemType="input"
          formItemTypeProps={{
            inputType: 'email',
            label: '邮箱地址',
            labelFor: 'email-address',
            placeholder: '请输入邮箱，然后点击发送验证码',
            ifUseLabelTag: true,
            errorHint: lastError.email && lastError.email.join('，'),
            value: lastData.email,
            onChange: onChangeEmail,
            onBlur: onBlurEmail,
            onFocus: onFocusEmail,
          }}
        />

        {/* 验证码 */}
        <FormItem
          formItemType="validateCodeSend"
          formItemTypeProps={{
            value: lastData.code,
            errorHint: lastError.code && lastError.code.join('，'),
            onChange: onChangeCode,
            onBlur: onBlurCode,
            onFocus: onFocusCode,
            onClickSendCode: onClickSendCode,
          }}
        />

        {/* 登录 */}
        <section className="form-item-sc mt-[100px]">
          <button type="submit" className="primary-btn">
            登录
          </button>
        </section>
      </form>
    </div>
  )
}
