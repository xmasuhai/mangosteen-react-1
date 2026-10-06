import { useEffect } from 'react'

export function useTitle(title: string) {
  useEffect(() => {
    if (!title) { return }
    document.title = title ?? '记账'
  }, [title])
}
