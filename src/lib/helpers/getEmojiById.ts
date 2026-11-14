import { emojiTopicList, type EmojiMainTopic } from '@/lib/const/emojiTopicList'
import { safeEmojiList, type EmojiTopic } from '@/lib/const/safeEmojiList'

type EmojiItem = {
  id: number
  emoji: string
  hint: string
  topic: EmojiTopic['topic']
  mainTopic: EmojiMainTopic
}

export const getEmojiById = (id: number): EmojiItem => {
  const emojiItem = safeEmojiList.find((item) => {
    return item.emoji_list.find((emoji) => emoji.index === id)
  })

  if (!emojiItem) {
    throw new Error('emoji not found by getEmojiById')
  }

  const emoji = emojiItem?.emoji_list.find((emoji) => emoji.index === id)?.unicode ?? ''
  const hint = emojiItem?.emoji_list.find((emoji) => emoji.index === id)?.hint ?? ''
  const topic = emojiItem?.topic
  const mainTopic = emojiTopicList.find((item) =>
    item.topics?.find((topic) => topic === topic)
  )?.mainTopic

  if (!mainTopic) {
    throw new Error('mainTopic not found by getEmojiById')
  }

  return {
    id,
    emoji,
    hint,
    topic,
    mainTopic,
  }
}
