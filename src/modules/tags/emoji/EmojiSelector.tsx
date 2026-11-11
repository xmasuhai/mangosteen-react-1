/*
 * @Author: xmasuhai xmasuhai@163.com
 * @Date: 2026-11-11 19:16:37
 * @LastEditors: xmasuhai xmasuhai@163.com
 * @LastEditTime: 2026-11-11 23:14:52
 * @FilePath: /mangosteen-react-1/src/modules/tags/emoji/EmojiSelector.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from 'react'
import { cn } from 'cn'
import { EmojiMainTopicNav } from '@/modules/tags/emoji/EmojiMainTopicNav'
import { EmojiUnicodeList } from '@/modules/tags/emoji/EmojiUnicodeList'
import type { EmojiMainTopic } from '@/lib/const/emojiTopicList';

interface Props {
  className?: string
  hasError?: boolean
}

/**
 * @Description: 颜文字选择器
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-11-11 18:02:00
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-11-11 18:02:00
 * @FilePath: src/modules/tags/emoji
 */
export const EmojiSelector: React.FC<Props> = ({ className, hasError }) => {
  const [_selectedEmoji, _setSelectedEmoji] = useState('')
  const [mainTopic, setMainTopic] = useState<EmojiMainTopic>('表情')
  const onChangeMainTopic = (topic: EmojiMainTopic) => {
    setMainTopic(topic)
  }

  return (
    <div
      className={cn(
        'min-h-[var(--input-min-height)] max-w-full flex-grow-1',
        'b-1 rounded-[var(--input-radius)] text-14px',
        hasError ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]',
        className
      )}>
      <EmojiMainTopicNav onChangeMainTopic={onChangeMainTopic } />

      <EmojiUnicodeList mainTopic={mainTopic} />
    </div>
  )
}
