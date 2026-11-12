import { useState } from 'react'
import { type EmojiMainTopic, emojiTopicList } from '@/lib/const/emojiTopicList.ts'
import { cn } from 'cn'

interface Props {
  className?: string
  mainTopic?: string
  onChangeMainTopic: (topic: EmojiMainTopic) => void
}

/**
 * @Description: 颜文字主题导航
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-11-11 18:08:14
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-11-11 18:08:14
 * @FilePath: src/modules/tags/emoji
 */
export const EmojiMainTopicNav: React.FC<Props> = ({
  className,
  mainTopic = '表情',
  onChangeMainTopic,
}) => {
  const navList = emojiTopicList?.map((topicItem) => topicItem.mainTopic) ?? []
  const [selectedMainTopic, setSelectedMainTopic] = useState(navList?.[0] ?? mainTopic)
  const selectMainTopic = (topic: EmojiMainTopic) => {
    setSelectedMainTopic(topic)
    onChangeMainTopic(topic)
  }

  return (
    <nav className={cn('min-h-35px', className)}>
      <menu
        className={cn(
          'flex flex-nowrap grow-0 shrink-0 mx-1em py-0 overflow-auto scrollbar-hide',
          '[&>li.selected]:(text-[var(--emoji-nav-text-selected)] font-bold)'
        )}>
        {navList.map((item, index) => (
          <li
            key={`${index}_${item}`}
            onClick={() => selectMainTopic(item)}
            className={cn(
              'shrink-0 inline-block p-.5em',
              'text-[var(--emoji-nav-text)] whitespace-nowrap truncate',
              item === selectedMainTopic ? 'selected' : ''
            )}>
            {item}
          </li>
        ))}
      </menu>
    </nav>
  )
}
