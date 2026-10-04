import { create } from 'zustand'

interface Local {
  hasReadWelcome: boolean | null
  setHasReadWelcome: (read: boolean) => void
}

const init = localStorage.getItem('hasReadWelcome') ?? 'false'

export const useLocalStore = create<Local>()(set => ({
  hasReadWelcome: JSON.parse(init === 'true' ? 'true' : 'false'),
  setHasReadWelcome: (read: boolean) => {
    localStorage.setItem('hasReadWelcome', read ? 'true' : 'false')
    set({ hasReadWelcome: read })
  },
}))
