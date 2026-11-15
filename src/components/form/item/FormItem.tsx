import { InputEmoji } from '@/components/form/item/InputEmoji'
import { InputText } from '@/components/form/item/InputText'
import { InputValidateCodeSend } from '@/components/form/item/InputValidateCodeSend'
import type { FormItemType, FormItemTypeProps } from '@/components/form/item/FormItemType.ts'

interface Props<T extends FormItemType> {
  className?: string
  formItemType: T
  formItemTypeProps: FormItemTypeProps<T>
}

export const FormItem = <T extends FormItemType>({
  className,
  formItemType,
  formItemTypeProps,
}: Props<T>) => {
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
      default:
        return null
    }
  }
  return <>{renderContent()}</>
}
