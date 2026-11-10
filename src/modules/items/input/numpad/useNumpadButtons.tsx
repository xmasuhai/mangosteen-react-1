// import type { SvgIconName } from '@svgoStore'
import { cn } from 'cn'
import { useNumpadAmountStore } from '@/stores/useNumpadAmountStore.ts'
import { useVibrate } from '@/hooks/useVibrate.ts'

type ButtonItem<T extends boolean = boolean> = {
  id: string
  text: string
  onClick: () => void
  extraClass?: string
} & (T extends true
  ? {
      hasIcon: T
      iconName: string //SvgIconName
    }
  : {
      hasIcon?: false
      iconName?: never
    })

/**
 * @Description: 数字按键列表
 * @Description: 注意使用 cn 函数拼接类名，必须在 TSX 中使用
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-16 23:08:22
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-16 23:51:59
 * @FilePath: src/modules/items/useNumpadButtons.tsx
 */
export const useNumpadButtons = () => {
  const { vibrate, isSupported } = useVibrate(15)
  const {
    appendText: _appendText,
    clearText: _clearText,
    backspaceText: _backspaceText,
  } = useNumpadAmountStore()

  const appendText = (str: string) => {
    if (isSupported) {
      vibrate()
    }
    _appendText(str)
  }

  const clearText = () => {
    if (isSupported) {
      vibrate()
    }
    _clearText()
  }

  const backspaceText = () => {
    if (isSupported) {
      vibrate()
    }
    _backspaceText()
  }
  const numpadButtons: ButtonItem[] = [
    { id: '1', text: '1', onClick: () => appendText('1') },
    { id: '2', text: '2', onClick: () => appendText('2') },
    { id: '3', text: '3', onClick: () => appendText('3') },
    { id: 'clear', text: '归零' /* '清空' */, onClick: () => clearText() },
    { id: '4', text: '4', onClick: () => appendText('4') },
    { id: '5', text: '5', onClick: () => appendText('5') },
    { id: '6', text: '6', onClick: () => appendText('6') },
    {
      id: 'backspace',
      text: '退格',
      onClick: () => backspaceText(),
      hasIcon: true,
      iconName: 'backspace',
      extraClass: cn('children:(size-1.5em)'),
    },
    { id: '7', text: '7', onClick: () => appendText('7') },
    { id: '8', text: '8', onClick: () => appendText('8') },
    { id: '9', text: '9', onClick: () => appendText('9') },
    {
      id: 'submit',
      text: '提交',
      onClick: () => {
        clearText()
      },
      extraClass: cn('bg-[var(--pad-submit-button-bg-color)] text-[var(--button-text-color)]'),
    },
    { id: '0', text: '0', onClick: () => appendText('0') },
    {
      id: 'dot',
      text: 'dot',
      onClick: () => appendText('.'),
      hasIcon: true,
      iconName: 'decimal_point',
      extraClass: cn('children:(size-2em translate-y-[-9px] font-extrabold)'),
    },
  ]

  return { numpadButtons }
}
