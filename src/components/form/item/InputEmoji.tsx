import { EmojiSelector } from '@/components/form/item/emoji/EmojiSelector'
import { getEmojiById } from '@/lib/helpers/getEmojiById'
import { useEmojiStore } from '@/stores/useEmojiStore'
import { cn } from 'cn'
import { useEffect, useState } from 'react'

interface Props {
  className?: string
  hasLabelColon?: boolean
  errorHint?: string
  hasErrorPlaceholder?: boolean
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
}

export const InputEmoji: React.FC<Props> = ({
  className,
  hasLabelColon = true,
  errorHint,
  hasErrorPlaceholder = true,
  value = '',
  onChange,
  onBlur,
  onFocus,
}) => {
  const { emoji, hint, setEmoji: setEmojiItem } = useEmojiStore()
  // const [emoji, setEmoji] = useState(value)
  // const [emojiHint, setEmojiHint] = useState('')
  const setEmoji = (emoji?: string) => {
    setEmojiItem({ emoji: value ?? emoji })
    onChange?.(emoji ?? '')
  }
  const setEmojiHint = (hint: string) => {
    setEmojiItem({ hint })
  }

  return (
    <section className={cn('form-item-sc relative', className)}>
      <div onBlur={onBlur} onFocus={onFocus} className="form-label-sc text-[22px]">
        <span className="text-[16px]">符号 {hasLabelColon ? '：' : ''}</span>
        <span className={cn('text-22px inline-block wag')}>{emoji}</span>
        <span className="text-[16px] animate-rainbow color-[var(--vp-c-brand-next)]">
          {/* {emojiHint} */}
          {hint}
        </span>
      </div>

      <EmojiSelector
        // onChangeEmojiUnicode={setEmoji}
        // onChangeEmojiHint={setEmojiHint}
        onBlur={onBlur}
        onFocus={onFocus}
        hasError={!!errorHint}
        className="form-item-content-sc"
      />
      {(errorHint || hasErrorPlaceholder) && (
        <span className="form-item-error-sc w-fit buzz">{errorHint ?? <>&nbsp;</>}</span>
      )}
    </section>
  )
}
