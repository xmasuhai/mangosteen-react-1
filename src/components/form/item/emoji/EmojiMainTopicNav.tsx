import { useEffect } from 'react'
import { type EmojiMainTopic, emojiTopicList } from '@/lib/const/emojiTopicList.ts'
import { cn } from 'cn'
import { useEmojiStore } from '@/stores/useEmojiStore'

interface Props {
  className?: string
}

/**
 * @Description: 颜文字主题导航
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-11-11 18:08:14
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-11-11 18:08:14
 * @FilePath: src/modules/tags/emoji
 */
export const EmojiMainTopicNav: React.FC<Props> = ({ className }) => {
  const navList = emojiTopicList?.map((topicItem) => topicItem.mainTopic) ?? []
  const { mainTopic = navList?.[0], setEmoji, reset } = useEmojiStore()

  const selectMainTopic = (mainTopic: EmojiMainTopic) => {
    reset()
    setEmoji({ mainTopic })
  }

  useEffect(() => {
    reset()
    setEmoji({ mainTopic })
  }, [mainTopic, setEmoji, reset])

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
              item === mainTopic ? 'selected' : ''
            )}>
            {item}
          </li>
        ))}
      </menu>
    </nav>
  )
}
