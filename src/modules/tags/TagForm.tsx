import { FormItem } from '@/components/form/item/FormItem'
import type { PickedTag } from '@/global'
import { hasError, type FormRules } from '@/lib/validator/formValidate'
import { useTagCreateStore } from '@/stores/useTagCreateStore'
import { useTagEditStore } from '@/stores/useTagEditStore'
import { cn } from 'cn'
import React, { type FormEventHandler } from 'react'

interface Props {
  className?: string
  mode: 'create' | 'edit'
  submitButtonText?: string
}

const tagRules: FormRules<PickedTag> = [
  { key: 'name', type: 'required', required: true, message: '标签名称不能为空' },
  { key: 'name', type: 'length', min: 1, max: 4, message: '最多输入4个字符' },
  { key: 'sign', type: 'required', required: true, message: '符号不能为空' },
] as const

/*
 * @Author: xmasuhai
 * @Email: xmasuhai@163.com
 * @Date: 2026-11-14 12:35:58
 * @Last Modified by:   xmasuhai
 * @Last Modified time: 2026-11-14 19:48:26
 * @Description: 标签表单-创建/编辑
 * @Description: 入参数据：lastData、lastError
 * @Description: 表单操作：更新数据、清除错误提示、验证数据、提交数据
 */
export const TagForm: React.FC<Props> = ({
  className,
  mode = 'create',
  submitButtonText = '确定',
}) => {
  const create = useTagCreateStore()
  const edit = useTagEditStore()
  const {
    data: lastData,
    error: lastError,
    setData,
    clearError,
    revalidateFormItems,
  } = mode === 'edit' ? edit : create

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
    revalidateFormItems<PickedTag>(lastData, tagRules, lastError)
    // 注意过期的闭包 lastData、lastError 都是闭包，不能直接使用，需要用 useSignInStore.getState() 获取最新状态
    const activeStore = mode === 'edit' ? useTagEditStore : useTagCreateStore
    const freshError = activeStore.getState().error
    const freshData = activeStore.getState().data
    if (!hasError(freshError)) {
      console.log('onSubmit_______________________')
      console.log('%c⧭ lastData', 'color: #40fff2', lastData)
      console.log('%c⧭ freshData', 'color: #40fff2', freshData)
      console.log('%c⧭ lastError', 'color: #40fff2', lastError)
      console.log('%c⧭ freshError', 'color: #40fff2', freshError)
      // console.log('%c⧭ TODO: 发送创建标签请求', 'color: #40fff2', formData)
      console.log('_______________________onSubmit')
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

      <p className="form-item-sc text-center">记账时长按，即可进行编辑</p>

      <div className="form-item-sc">
        <button type="submit" className="primary-btn">
          {submitButtonText}
        </button>
      </div>

      {mode === 'edit' && (
        <div className="form-item-sc mb-32px">
          <button type="submit" className="primary-btn bg-[var(--delete-button-bg)]">
            删除标签
          </button>
        </div>
      )}
    </form>
  )
}
