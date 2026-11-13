import { FormItem } from '@/components/form/item/FormItem'
import type { PickedTag } from '@/global'
import { hasError, type FormRules } from '@/lib/validator/formValidate'
import { useTagCreateStore } from '@/stores/useTagCreateStore'
import { cn } from 'cn'
import { type FormEventHandler, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

interface Props {
  className?: string
}

const tagRules: FormRules<PickedTag> = [
  { key: 'name', type: 'required', required: true, message: '标签名称不能为空' },
  { key: 'name', type: 'length', min: 1, max: 4, message: '最多输入4个字符' },
  { key: 'sign', type: 'required', required: true, message: '符号不能为空' },
] as const

export const TagForm: React.FC<Props> = ({ className }) => {
  const [searchParams] = useSearchParams()
  const {
    data: lastData,
    error: lastError,
    setData,
    clearError,
    revalidateFormItems,
  } = useTagCreateStore()

  useEffect(() => {
    const kind = searchParams.get('kind')
    if (!kind) {
      throw new Error('kind is required')
    }
    if (kind !== 'incomes' && kind !== 'expenses') {
      throw new Error('kind is invalid')
    }
    setData({ kind })
    console.log('TagCreatePage_______________________')
    console.log('%c⧭', 'color: #607339', searchParams.get('kind'))
    console.log('_______________________TagCreatePage')
  }, [searchParams, setData])

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

  const formData = useMemo(
    () => ({
      sign: lastData.sign,
      name: lastData.name,
    }),
    [lastData]
  )
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    // 注意过期的闭包 lastData、lastError 都是闭包，不能直接使用，需要用 useSignInStore.getState() 获取最新状态
    const freshError = useTagCreateStore.getState().error
    const freshData = useTagCreateStore.getState().data
    revalidateFormItems<PickedTag>(freshData, tagRules, freshError)
    if (!hasError(freshError)) {
      console.log('onSubmit_______________________')
      console.log('%c⧭', 'color: #40fff2', formData)
      console.log('_______________________onSubmit')
      // TODO: 发送创建标签请求
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn('form-sc', className)}>
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
  )
}
