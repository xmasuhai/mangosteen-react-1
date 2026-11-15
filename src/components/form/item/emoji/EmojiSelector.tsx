import { cn } from 'cn'
import { EmojiMainTopicNav } from '@/components/form/item/emoji/EmojiMainTopicNav'
import { EmojiUnicodeList } from '@/components/form/item/emoji/EmojiUnicodeList'
import { useEmojiStore } from '@/stores/useEmojiStore'

interface Props {
  className?: string
  hasError?: boolean
  onBlur?: () => void
  onFocus?: () => void
}

/**
 * @Description: 颜文字选择器
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-11-11 18:02:00
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-11-11 18:02:00
 * @FilePath: src/modules/tags/emoji
 */
export const EmojiSelector: React.FC<Props> = ({ className, hasError, ...restProps }) => {
  const { mainTopic } = useEmojiStore()
  return (
    <div
      className={cn(
        'grow-1 shrink-1 flex flex-col',
        'min-h-[var(--input-min-height)] max-w-full',
        'b-1 rounded-[var(--input-radius)] text-14px',
        hasError ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]',
        className
      )}>
      <EmojiMainTopicNav />
      <EmojiUnicodeList key={mainTopic} {...restProps} />
    </div>
  )
}
