import type { HintPayload } from '@/hooks/useGlobalHintsBus'
import SwAl, { SweetAlertOptions } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const Notify = withReactContent(SwAl)

const notifyOptions: SweetAlertOptions = {
  icon: 'warning',
  position: 'top',
  text: '输入的数字长度不支持超过10位',
  toast: true,
  timer: 2000,
  timerProgressBar: true,
  showConfirmButton: false,
}

export const numberLimitListener = (hint?: HintPayload) => {
  if (typeof hint === 'string') {
    Notify.fire({ ...notifyOptions, text: hint })
  } else if (hint && typeof hint === 'object') {
    Notify.fire({ ...notifyOptions, ...hint, icon: hint.type, text: hint.message })
  } else {
    Notify.fire({ ...notifyOptions })
  }
}
