import { EmojiSelector } from '@/components/form/item/emoji/EmojiSelector'
import { getEmojiById } from '@/lib/helpers/getEmojiById'
import { useEmojiStore } from '@/stores/useEmojiStore'
import { cn } from 'cn'
import { useEffect } from 'react'

interface Props {
  className?: string
  hasLabelColon?: boolean
  errorHint?: string
  hasErrorPlaceholder?: boolean
  value?: number
  onChange?: (sign_id: number, sign: string) => void
  onBlur?: () => void
  onFocus?: () => void
}

export const InputEmoji: React.FC<Props> = ({
  className,
  hasLabelColon = true,
  errorHint,
  hasErrorPlaceholder = true,
  value = 0,
  onChange,
  ...restProps
}) => {
  // 按字段订阅，避免 store 任意字段变化触发本组件重渲染
  const emojiId = useEmojiStore((state) => state.id)
  const emoji = useEmojiStore((state) => state.emoji)
  const hint = useEmojiStore((state) => state.hint)
  const setEmoji = useEmojiStore((state) => state.setEmoji)

  // 用户在 store 中选中符号后，同步通知表单
  useEffect(() => {
    if (!emojiId || !emoji) {
      return
    }
    onChange?.(emojiId, emoji)
  }, [emojiId, emoji, onChange])

  // 表单回填 value 时，反向同步到 store（index 从 1 开始，0 表示未选择）
  useEffect(() => {
    if (!value || value === emojiId) {
      return
    }
    try {
      setEmoji(getEmojiById(value))
    } catch (error) {
      console.warn('[InputEmoji] invalid emoji value:', value, error)
    }
  }, [value, emojiId, setEmoji])

  return (
    <section className={cn('form-item-sc relative', className)}>
      <div className="form-label-sc text-[22px]">
        <span className="text-[16px]">符号 {hasLabelColon ? '：' : ''}</span>
        <span className={cn('text-22px inline-block wag')}>{emoji}</span>
        <span className="text-[16px] animate-rainbow color-[var(--vp-c-brand-next)]">{hint}</span>
      </div>

      <EmojiSelector {...restProps} hasError={!!errorHint} className="form-item-content-sc" />

      {(errorHint || hasErrorPlaceholder) && (
        <span className="form-item-error-sc w-fit buzz">{errorHint ?? <>&nbsp;</>}</span>
      )}
    </section>
  )
}
