import { cn } from 'cn'
import { useEffect, useMemo } from 'react'
import { type EmojiSubTopic, emojiTopicList } from '@/lib/const/emojiTopicList.ts'
import { safeEmojiList, type EmojiItem } from '@/lib/const/safeEmojiList.ts'
import { useEmojiStore } from '@/stores/useEmojiStore'
import { getEmojiById } from '@/lib/helpers/getEmojiById'

interface Props {
  className?: string
  onBlur?: () => void
  onFocus?: () => void
}

/**
 * @Description: 颜文字编码列表
 * @Author: xmasuhai xmasuhai@163.com
 * @Date: 2026-11-11 18:08:49
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-11-11 18:08:49
 * @FilePath: src/modules/tags/emoji
 */
export const EmojiUnicodeList: React.FC<Props> = ({ className, ...restProps }) => {
  const { mainTopic, emoji, setEmoji } = useEmojiStore()

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

  const emojiHint = useMemo(
    () => selectedFlattedEmojiList?.find((emojiItem) => emojiItem.unicode === emoji)?.hint ?? '',
    [selectedFlattedEmojiList, emoji]
  )
  const switchEmojiUnicode = (unicode: string, id: number) => {
    if (unicode === emoji) {
      return
    }
    const emojiItem = getEmojiById(id)
    setEmoji({
      ...emojiItem,
    })
  }

  useEffect(() => {
    setEmoji({
      emoji,
      hint: emojiHint,
    })
  }, [emoji, emojiHint, setEmoji])

  const fitScreenHeight = useMemo(() => {
    const height = window.innerHeight
    return height <= 844 ? 'h-[calc(1.65em_*_9)]' : 'h-[calc(1.65em_*_12)]'
  }, [])

  return (
    <ol
      tabIndex={-1}
      className={cn(
        'scrollbar-hide overflow-auto',
        fitScreenHeight,
        'grow-1 shrink-1',
        // 'flex flex-wrap content-start',
        'grid place-items-center',
        'grid-cols-[repeat(auto-fit,minmax(10%,1fr))] grid-rows-[repeat(auto-fill,1.65em)]',
        'px-.5em p-t-.25em p-b-.5em',
        'text-22px line-height-1.5em',
        'children:(text-22px)',
        className
      )}>
      {selectedFlattedEmojiList.map(({ index: id, unicode }, index) => (
        <li
          // 设置 tabIndex 让普通元素 li 元素能够接收焦点，触发 onBlur
          tabIndex={index}
          key={`id_${id}_${index}_${unicode}`}
          onClick={() => {
            switchEmojiUnicode(unicode, id)
          }}
          {...restProps}
          className={cn(
            'text-center grow-0 shrink-0 w-35px',
            'b-1 b-transparent rounded-[var(--input-radius)]',
            'flex items-center justify-center',
            unicode === emoji && 'bg-blue-300 outline-1px outline-solid outline-[var(--main)] jello'
          )}>
          {unicode}
        </li>
      ))}
    </ol>
  )
}
