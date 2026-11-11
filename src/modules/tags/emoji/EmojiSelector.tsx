import { useState } from 'react'
import { cn } from 'cn'
import { EmojiMainTopicNav } from '@/modules/tags/emoji/EmojiMainTopicNav'
import { EmojiUnicodeList } from '@/modules/tags/emoji/EmojiUnicodeList'

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
  const [selectedEmoji, setSelectedEmoji] = useState('')
  return (
    <div
      className={cn(
        'min-h-[var(--input-min-height)] max-w-full flex-grow-1',
        'b-1 rounded-[var(--input-radius)] text-14px',
        hasError ? 'b-[var(--error-color)]' : 'b-[var(--input-border-color)]'
      )}>
      <EmojiMainTopicNav />

      <EmojiUnicodeList />
    </div>
  )
}
