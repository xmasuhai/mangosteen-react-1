import { InputEmoji } from '@/components/form/item/InputEmoji'
import { InputText } from '@/components/form/item/InputText'
import { InputValidateCodeSend } from '@/components/form/item/InputValidateCodeSend'
import type { FormItemType, FormItemTypeProps } from '@/components/form/item/FormItemType.ts'
import { OptionSelector } from '@/components/form/item/OptionSelector'

interface Props<T extends FormItemType, U extends string | number = string> {
  className?: string
  formItemType: T
  formItemTypeProps: FormItemTypeProps<T, U>
}

export function FormItem<T extends FormItemType, U extends string | number = string>(props: Props<T, U>) {
  const { className, formItemType, formItemTypeProps } = props
  const renderContent = () => {
    // TS 在 switch (formItemType) 中不会把泛型 T 缩窄为字面量
    // 因此 formItemTypeProps 仍为联合类型
    // 展开到各具体组件时 value 等属性类型不兼容
    // 在各分支断言为对应字面量类型的 props
    switch (formItemType) {
      case 'input':
        return (
          <InputText {...(formItemTypeProps as FormItemTypeProps<'input'>)} className={className} />
        )
      case 'emoji':
        return (
          <InputEmoji
            {...(formItemTypeProps as FormItemTypeProps<'emoji'>)}
            className={className}
          />
        )
      case 'validateCodeSend':
        return (
          <InputValidateCodeSend
            {...(formItemTypeProps as FormItemTypeProps<'validateCodeSend'>)}
            className={className}
          />
        )
      case 'optionSelector':
        return (
          <OptionSelector<U>
            {...(formItemTypeProps as FormItemTypeProps<'optionSelector', U>)}
            className={className}
          />
        )
      default:
        return null
    }
  }
  return <>{renderContent()}</>
}
