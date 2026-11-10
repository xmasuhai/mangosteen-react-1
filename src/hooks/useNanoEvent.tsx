import { GlobalHintsEvents, HintPayload, useGlobalHintsBus } from '@/hooks/useGlobalHintsBus'
import { useEffect } from 'react'

export const useNanoEvent = <K extends keyof GlobalHintsEvents = 'hint'>(
  event: K,
  handler: (payload?: HintPayload) => void
) => {
  const { on } = useGlobalHintsBus()

  useEffect(() => {
    const unbind = on(event, handler)
    return unbind
  }, [event, handler, on])
}
