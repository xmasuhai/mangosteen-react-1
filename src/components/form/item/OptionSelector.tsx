import type { SelectorOption } from '@/components/form/item/FormItemType'
import { cn } from 'cn'

interface Props<T> {
  className?: string
  // for 属性，用于内部 input 标签 id 属性联动
  labelFor?: string
  label?: string
  hasLabelColon?: boolean
  errorHint?: string
  hasErrorPlaceholder?: boolean
  value?: T
  options?: SelectorOption<T>[]
  placeholder?: string
  onChange?: (value: T) => void
  onBlur?: () => void
  onFocus?: () => void
}

export const OptionSelector = <T extends string | number>({
  className,
  label,
  labelFor,
  hasLabelColon = true,
  errorHint,
  hasErrorPlaceholder = true,
  placeholder,
  value,
  options,
  onChange,
  onBlur,
  onFocus,
}: Props<T>) => {
  const labelForId = labelFor && `form-item-select-${labelFor}`
  const labelChildren = (
    <>
      {label}
      {hasLabelColon ? '：' : ''}
    </>
  )
  const labelTag = (
    <label {...(labelForId ? { htmlFor: labelForId } : {})} className="form-label-sc">
      {labelChildren}
    </label>
  )
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T)
  }
  return (
    <section className={cn('form-item-sc', className)}>
      {label && labelTag}
      <div className="form-item-content-sc">
        <select
          id={labelForId}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          class={cn(
            'min-h-[var(--input-min-height)] p-x-.5em text-18px',
            'b-1 rounded-[var(--input-radius)] shadow-[inset_0_0_3px_var(--input-shadow)]',
            errorHint ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]'
          )}
          placeholder={placeholder}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {(errorHint || hasErrorPlaceholder) && (
          <span className="form-item-error-sc w-fit buzz">{errorHint ?? <>&nbsp;</>}</span>
        )}
      </div>
    </section>
  )
}
