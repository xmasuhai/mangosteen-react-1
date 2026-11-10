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
  // noPayloadEventName: () => void
}

export const emitter = createNanoEvents<GlobalHintsEvents>()

/**
 * 创建总线单例
 * 导出两个接口，可直接解构获取
 * 1. on: 监听总线事件，返回一个取消监听函数
 * 2. emit: 触发总线事件
 * 配合使用 sweetalert2 提示框，payload 传参类型参考 SweetAlertOptions
 */
export const useGlobalHintsBus = () => ({
  ...(emitter ? emitter : createNanoEvents<GlobalHintsEvents>()),
  on: emitter.on.bind(emitter),
  emit: emitter.emit.bind(emitter),
})
