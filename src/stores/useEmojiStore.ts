import type { EmojiMainTopic } from '@/lib/const/emojiTopicList'
import type { EmojiTopic } from '@/lib/const/safeEmojiList'
import { create } from 'zustand'
import { withDevtoolsBridge } from 'zustand-devtools-bridge'

interface EmojiState {
  id: number | null
  emoji: string
  hint: string
  topic: EmojiTopic['topic'] | ''
  mainTopic: EmojiMainTopic | ''
}

interface EmojiActions {
  setEmoji: (emojiState: EmojiState) => void
  reset: () => void
}

const initialEmojiState: EmojiState = {
  id: null,
  emoji: '',
  hint: '',
  topic: '',
  mainTopic: '',
}

export const useEmojiStore = create<EmojiState & EmojiActions>()(
  withDevtoolsBridge(
    (set, _get) => ({
      ...initialEmojiState,
      setEmoji: (emojiState: EmojiState) => set((state) => ({ ...state, ...emojiState })),
      reset: () => set(initialEmojiState),
    }),
    {
      name: 'emoji',
      enabled: import.meta.env.DEV,
    }
  )
)
