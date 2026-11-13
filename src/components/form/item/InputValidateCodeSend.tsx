import { cn } from 'cn'

interface Props {
  className?: string
  value?: string
  errorHint?: string
  onChange?: (code: string) => void
  onBlur?: () => void
  onFocus?: () => void
  onClickSendCode?: () => void
}

export const InputValidateCodeSend: React.FC<Props> = ({
  className,
  value,
  errorHint,
  onChange,
  onBlur,
  onFocus,
  onClickSendCode,
}) => {
  const inputType = 'text'
  const labelForId = `form-item-${inputType}-sms-code`
  return (
    <section className={cn('form-item-sc', className)}>
      <label htmlFor={labelForId} className="form-label-sc">
        验证码：
      </label>
      <div className="form-item-content-sc">
        <input
          type={inputType}
          id={labelForId}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder="六位数字"
          className={cn(
            'form-input-text-sc w-[9em]',
            errorHint ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]'
          )}
        />
        <button type="button" onClick={onClickSendCode} className="grow-1 form-btn-sc">
          发送验证码
        </button>
      </div>
      {<span className="form-item-error-sc w-fit buzz">{errorHint ?? <>&nbsp;</>}</span>}
    </section>
  )
}
