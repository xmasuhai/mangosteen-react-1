import { HTMLAttributes } from 'react'
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, AttributifyAttributes, DOMAttributes<T> {
    // 允许传入 UnoCSS 属性
    text?: string
    bg?: string
    flex?: string
    // 或者直接使用通配符或特殊定义
    [key: string]: unknown
  }
}
