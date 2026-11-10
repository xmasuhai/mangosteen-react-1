import { createNanoEvents } from 'nanoevents'
import { SweetAlertOptions } from 'sweetalert2'

type HintType = 'warning' | 'error' | 'success' | 'info' | 'question'
type HintPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'center'
  | 'center-start'
  | 'center-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'

export type HintParams = {
  type: HintType
  message: string
  position: HintPosition
} & SweetAlertOptions

export type HintPayload = undefined | string | HintParams

export interface GlobalHintsEvents {
  hint: (payload?: HintPayload) => void
}

export const emitter = createNanoEvents<GlobalHintsEvents>()

export const useGlobalHintsBus = () => ({
  ...(emitter ? emitter : createNanoEvents<GlobalHintsEvents>()),
  on: emitter.on.bind(emitter),
  emit: emitter.emit.bind(emitter),
})
