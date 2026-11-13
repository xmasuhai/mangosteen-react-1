export type FormItemType = 'input' | 'emoji' | 'validateCodeSend'

export type InputType = 'text' | 'password' | 'email' | 'number'

export type CommonFormItemTypeProps = {
  label?: string
  labelFor?: string
  ifUseLabelTag?: boolean
  hasLabelColon?: boolean
  placeholder?: string
  errorHint?: string
  hasErrorPlaceholder?: boolean
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
}

export type FormItemTypeProps<T extends FormItemType> = T extends 'input'
  ? { type?: 'input'; inputType: InputType } & CommonFormItemTypeProps
  : T extends 'emoji'
    ? { type?: 'emoji' } & CommonFormItemTypeProps
    : T extends 'validateCodeSend'
      ? { type?: 'validateCodeSend'; onClickSendCode?: () => void } & CommonFormItemTypeProps
      : never
