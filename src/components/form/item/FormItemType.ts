export type FormItemType = 'input' | 'emoji' | 'validateCodeSend' | 'optionSelector'
export type InputType = 'text' | 'password' | 'email' | 'number'
export interface SelectorOption<U = string> {
  label: string
  value: U
  disabled?: boolean
}

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

export type FormItemTypeProps<T extends FormItemType, U = string> = T extends 'input'
  ? CommonFormItemTypeProps & { type?: 'input'; inputType: InputType }
  : T extends 'emoji'
    ? Omit<CommonFormItemTypeProps, 'value' | 'onChange'> & {
        type?: 'emoji'
        value?: number
        onChange?: (sign_in: number, sign: string) => void
      }
    : T extends 'validateCodeSend'
      ? CommonFormItemTypeProps & { type?: 'validateCodeSend'; onClickSendCode?: () => void }
      : T extends 'optionSelector'
        ? Omit<CommonFormItemTypeProps, 'value' | 'onChange'> & {
            type?: 'optionSelector'
            ifOneLineLabel?: boolean
            value: U
            options: SelectorOption<U>[]
            onChange?: (value: U) => void
          }
        : never

// 兼容互斥类型
export type FormItemTypePropsXxx = CommonFormItemTypeProps &
  (
    | { type: 'input'; inputType: InputType }
    | { type: 'emoji'; value: number; onChange: (sign_in: number, sign: string) => void }
    | { type: 'validateCodeSend'; onClickSendCode?: () => void }
    | {
        type: 'optionSelector'
        ifOneLineLabel?: boolean
        value: string
        options: SelectorOption[]
        onChange: (value: string) => void
      }
  )
