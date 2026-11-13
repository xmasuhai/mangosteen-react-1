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
    switch (formItemType) {
      case 'input':
        return <InputText {...formItemTypeProps} className={className} />
      case 'emoji':
        return <InputEmoji {...formItemTypeProps} className={className} />
      case 'validateCodeSend':
        return <InputValidateCodeSend {...formItemTypeProps} className={className} />
      default:
        return null
    }
  }
  return <>{renderContent()}</>
}
