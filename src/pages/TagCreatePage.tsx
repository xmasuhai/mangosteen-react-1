import { useMemo, type FormEventHandler } from 'react'
import { cn } from 'cn'
import { GradientBanner } from '@/components/GradientBanner'
import { TopNav } from '@/components/TopNav'
import { SvgIcon } from '@/components/SvgIcon'
import { FormItem } from '@/components/form/item/FormItem'
import { useTagCreateStore } from '@/stores/useTagCreateStore'
import type { PickedTag } from '@/global'
import { hasError, type FormRules } from '@/lib/validator/formValidate'

interface Props {
  className?: string
}

const tagRules: FormRules<PickedTag> = [
  { key: 'name', type: 'required', required: true, message: '标签名称不能为空' },
  { key: 'name', type: 'length', min: 1, max: 4, message: '最多输入4个字符' },
  { key: 'sign', type: 'required', required: true, message: '符号不能为空' },
] as const

/*
 * @Description: 标签创建页
 * @Author: xmasuhai xmasuhai@163.com
 * @Date: 2026-11-11 19:16:37
 * @LastEditors: xmasuhai xmasuhai@163.com
 * @LastEditTime: 2026-11-11 23:18:30
 * @FilePath: /mangosteen-react-1/src/pages/TagCreatePage.tsx
 */
export const TagCreatePage: React.FC<Props> = ({ className }) => {
  const Icon = <SvgIcon name="back-arrow" className="size-[24px]" />

  const {
    data: lastData,
    error: lastError,
    setData,
    clearError,
    revalidateFormItems,
  } = useTagCreateStore()
  const formData = useMemo(
    () => ({
      sign: lastData.sign,
      name: lastData.name,
    }),
    [lastData]
  )

  const onChangeTagName = (name: string) => {
    setData({
      ...lastData,
      name,
    })
  }
  const onBlurTagName = () => {
    revalidateFormItems<PickedTag>({ name: lastData.name }, tagRules, lastError)
  }
  const onFocusTagName = () => {
    clearError('name')
  }

  const onChangeTagSign = (sign: string) => {
    setData({
      sign,
    })
  }
  const onBlurTagSign = () => {
    revalidateFormItems<PickedTag>({ sign: lastData.sign }, tagRules, lastError)
  }
  const onFocusTagSign = () => {
    clearError('sign')
  }
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    // 注意过期的闭包 lastData、lastError 都是闭包，不能直接使用，需要用 useSignInStore.getState() 获取最新状态
    const freshError = useTagCreateStore.getState().error
    const freshData = useTagCreateStore.getState().data
    revalidateFormItems<PickedTag>(freshData, tagRules, freshError)
    if (!hasError(freshError)) {
    }
  }

  return (
    <div className={cn('container w-screen h-screen relative', className)}>
      <GradientBanner>
        <TopNav title="新建标签" icon={Icon} />
      </GradientBanner>

      <form onSubmit={onSubmit} className="form-sc">
        <FormItem
          formItemType="input"
          formItemTypeProps={{
            inputType: 'text',
            label: '标签名',
            labelFor: 'tag-name',
            placeholder: '请输入标签名称',
            ifUseLabelTag: true,
            errorHint: lastError?.name && lastError.name.join('，'),
            value: lastData.name,
            onChange: onChangeTagName,
            onBlur: onBlurTagName,
            onFocus: onFocusTagName,
          }}
        />

        <FormItem
          formItemType="emoji"
          formItemTypeProps={{
            errorHint: lastError?.sign && lastError.sign.join('，'),
            value: lastData.sign,
            onChange: onChangeTagSign,
            onBlur: onBlurTagSign,
            onFocus: onFocusTagSign,
          }}
        />

        <p className="form-item-sc text-center">记账时长按即可进行编辑</p>

        <div className="form-item-sc">
          <button type="submit" className="primary-btn">
            确定
          </button>
        </div>
      </form>
    </div>
  )
}
