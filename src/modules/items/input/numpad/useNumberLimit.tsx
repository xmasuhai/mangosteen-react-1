import { GlobalHintsEvents, HintParams, useGlobalHintsBus } from '@/hooks/useGlobalHintsBus'
import { useEffect, useRef } from 'react'

const { bus } = useGlobalHintsBus()

export const useNumberLimit = <K extends keyof GlobalHintsEvents = 'hint'>(
  event: K,
  handler: (payload?: string | HintParams | undefined) => void
) => {
  const cbRef = useRef(handler)
  useEffect(() => {
    cbRef.current = handler
  }, [handler])

  useEffect(() => {
    const unbind = bus.on(event, cbRef.current)
    return unbind
  }, [event])
}
