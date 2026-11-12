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
  mainTopic?: EmojiMainTopic
}

/**
 * @Description: 颜文字编码列表
 * @Author: xmasuhai xmasuhai@163.com
 * @Date: 2026-11-11 18:08:49
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-11-11 18:08:49
 * @FilePath: src/modules/tags/emoji
 */
export const EmojiUnicodeList: React.FC<Props> = ({ className, mainTopic = '表情' }) => {
  const selectedTopicList = useMemo<readonly EmojiSubTopic[]>(
    () => emojiTopicList?.find((topicItem) => topicItem.mainTopic === mainTopic)?.topics ?? [],
    [mainTopic]
  )

  const selectedFlattedEmojiList = useMemo<EmojiItem[]>(
    () =>
      safeEmojiList
        .filter((item) => selectedTopicList.includes(item.topic))
        .flatMap((item) => item.emoji_list),
    [selectedTopicList]
  )

  // ["\u{1F600}", ...]
  const selectedMainTopicEmojiUnicodeList = useMemo<string[]>(
    () => selectedFlattedEmojiList.map((item) => item.unicode),
    [selectedFlattedEmojiList]
  )

  return (
    <ol
      className={cn(
        'scrollbar-hide overflow-auto h-[calc(1.65em_*_12)]',
        'grow-1 shrink-1',
        // 'flex flex-wrap content-start',
        'grid place-items-center',
        'grid-cols-[repeat(auto-fit,minmax(10%,1fr))] grid-rows-[repeat(auto-fill,1.65em)]',
        'px-.5em p-t-.25em p-b-.5em',
        'text-22px line-height-1.5em',
        'children:(text-22px)',
        className
      )}>
      {selectedMainTopicEmojiUnicodeList.map((unicode, index) => (
        <li
          key={`${index}_${unicode}`}
          onClick={() => {
            /* switchEmojiUnicode(unicode) */
          }}
          className={cn(
            'text-center grow-0 shrink-0 w-10% b-1 b-transparent',
            'flex items-center justify-center'
            // unicode === selectedEmojiUnicode.value &&
            // 'bg-blue-300 outline-1px outline-solid outline-[var(--main)] rounded-[var(--input-radius)]',
          )}>
          {unicode}
        </li>
      ))}
    </ol>
  )
}
