import { useEffect, useState } from 'react'
import { cn } from 'cn'
import { EmojiMainTopicNav } from '@/components/form/item/emoji/EmojiMainTopicNav'
import { EmojiUnicodeList } from '@/components/form/item/emoji/EmojiUnicodeList'
import type { EmojiMainTopic } from '@/lib/const/emojiTopicList'

interface Props {
  className?: string
  hasError?: boolean
  onChangeEmojiUnicode: (unicode: string) => void
  onChangeEmojiHint: (hint: string) => void
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
export const EmojiSelector: React.FC<Props> = ({
  className,
  hasError,
  onChangeEmojiUnicode,
  onChangeEmojiHint,
  ...restProps
}) => {
  const [mainTopic, setMainTopic] = useState<EmojiMainTopic>('表情')
  const onChangeMainTopic = (topic: EmojiMainTopic) => {
    setMainTopic(topic)
  }

  useEffect(() => {
    onChangeEmojiUnicode('')
    onChangeEmojiHint('')
  }, [mainTopic, onChangeEmojiUnicode, onChangeEmojiHint])

  return (
    <div
      className={cn(
        'grow-1 shrink-1 flex flex-col',
        'min-h-[var(--input-min-height)] max-w-full',
        'b-1 rounded-[var(--input-radius)] text-14px',
        hasError ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]',
        className
      )}>
      <EmojiMainTopicNav onChangeMainTopic={onChangeMainTopic} />

      <EmojiUnicodeList
        key={mainTopic}
        mainTopic={mainTopic}
        onChangeEmojiUnicode={onChangeEmojiUnicode}
        onChangeEmojiHint={onChangeEmojiHint}
        {...restProps}
      />
    </div>
  )
}
