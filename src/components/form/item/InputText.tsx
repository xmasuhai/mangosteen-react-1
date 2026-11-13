import { cn } from 'cn'

interface Props {
  className?: string
  ifUseLabelTag?: boolean
  // for 属性，用于内部 input 标签 id 属性联动
  labelFor?: string
  label?: string
  hasLabelColon?: boolean
  errorHint?: string
  hasErrorPlaceholder?: boolean
  placeholder?: string
  inputType?: 'text' | 'password' | 'email' | 'number'
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
}

export const InputText: React.FC<Props> = ({
  className,
  label,
  labelFor,
  hasLabelColon = true,
  ifUseLabelTag,
  errorHint,
  hasErrorPlaceholder = true,
  placeholder,
  inputType = 'text',
  value,
  onChange,
  onBlur,
  onFocus,
}) => {
  const labelForId = labelFor && `form-item-${inputType}-${labelFor}`
  const labelChildren = (
    <>
      {label}
      {hasLabelColon ? '：' : ''}
    </>
  )
  const labelTag = ifUseLabelTag ? (
    <label {...(labelForId ? { htmlFor: labelForId } : {})} className="form-label-sc">
      {labelChildren}
    </label>
  ) : (
    <div className="form-label-sc">{labelChildren}</div>
  )

  return (
    <section className={cn('form-item-sc', className)}>
      {label && labelTag}
      <div className="form-item-content-sc">
        <input
          id={labelForId}
          type={inputType}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          className={cn(
            'form-input-text-sc',
            errorHint ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]'
          )}
        />
      </div>
      {(errorHint || hasErrorPlaceholder) && (
        <span className="form-item-error-sc w-fit buzz">{errorHint ?? <>&nbsp;</>}</span>
      )}
    </section>
  )
}
