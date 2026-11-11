import { cn } from 'cn'
import { useMemo } from 'react'
import {
  type EmojiMainTopic,
  type EmojiSubTopic,
  emojiTopicList,
} from '@/lib/const/emojiTopicList.ts'
import { safeEmojiList, type EmojiItem } from '@/lib/const/safeEmojiList.ts'

interface Props {
  className?: string
  selectedMainTopic?: EmojiMainTopic
}

/**
 * @Description: 组件描述
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-11-11 18:08:49
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-11-11 18:08:49
 * @FilePath: src/modules/tags/emoji
 */
export const EmojiUnicodeList: React.FC<Props> = ({ className, selectedMainTopic = '表情' }) => {
  const selectedTopicList = useMemo<readonly EmojiSubTopic[]>(
    () =>
      emojiTopicList?.find((topicItem) => topicItem.mainTopic === selectedMainTopic)?.topics ?? [],
    [selectedMainTopic]
  )

  const selectedFlattedEmojiList = useMemo<EmojiItem[]>(
    () =>
      safeEmojiList
        .filter((item) => selectedTopicList.includes(item.topic))
        .flatMap((item) => item.emoji_list),
    [selectedTopicList]
  )

  const selectedMainTopicEmojiUnicodeList = useMemo<string[]>(
    () => selectedFlattedEmojiList.map((item) => item.unicode),
    [selectedFlattedEmojiList]
  )

  return (
    <ol
      className={cn(
        'scrollbar-hide overflow-auto h-[calc(1.65em_*_12)]',
        'flex flex-wrap content-start px-.5em py-2.5px',
        'text-22px line-height-1.5em',
        'children:(text-22px)',
        className
      )}>
      {selectedMainTopicEmojiUnicodeList.map((unicode, index) => (
        <li
          key={`${index}_${unicode}`}
          onClick={() => {
            /*switchEmojiUnicode(unicode)*/
          }}
          className={cn(
            'text-center grow-0 shrink-0 w-10% b-1 b-transparent'
            // unicode === selectedEmojiUnicode.value &&
            // 'bg-blue-300 outline-1px outline-solid outline-[var(--main)] rounded-[var(--input-radius)]',
          )}>
          {unicode}
        </li>
      ))}
    </ol>
  )
}
