import { useMemo, useState } from 'react'
import { EmojiMainTopic, emojiTopicList } from '@/lib/const/emojiTopicList.ts'
import { cn } from 'cn'

interface Props {
  className?: string
  mainTopic?: string
}

/**
 * @Description: 组件描述
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-11-11 18:08:14
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-11-11 18:08:14
 * @FilePath: src/modules/tags/emoji
 */
export const EmojiMainTopicNav: React.FC<Props> = ({ className, mainTopic }) => {
  const navList = useMemo(
    () => emojiTopicList.map((topicItem) => topicItem.mainTopic),
    [emojiTopicList]
  )
  const [selectedMainTopic, setSelectedMainTopic] = useState(navList?.[0] ?? mainTopic)
  const selectMainTopic = (topic: EmojiMainTopic) => {
    setSelectedMainTopic(selectedMainTopic)
  }

  return (
    <nav className={className}>
      <menu
        className={cn(
          'flex flex-nowrap overflow-auto mx-1em py-0 scrollbar-hide',
          '[&>li.selected]:(text-[var(--emoji-nav-text-selected)] font-bold)',
        )}>
        {navList.map((item, index) => (
          <li
            key={`${index}_${item}`}
            onClick={() => selectMainTopic(item)}
            className={cn(
              'shrink-0 inline-block p-.5em text-[var(--emoji-nav-text)] whitespace-nowrap',
              item === selectedMainTopic ? 'selected' : '',
            )}>
            {item}
          </li>
        ))}
      </menu>
    </nav>
  )
}
