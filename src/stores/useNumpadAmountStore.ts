import { useGlobalHintsBus } from '@/hooks/useGlobalHintsBus'
import { create } from 'zustand'

interface NumpadAmountState {
  amount: string
}
interface NumpadAmountActions {
  appendText: (inputText: string) => void
  backspaceText: () => void
  clearText: () => void
}

const { emit } = useGlobalHintsBus()

export const useNumpadAmountStore = create<NumpadAmountState & NumpadAmountActions>()(
  (set, get) => ({
    amount: '0.00',
    appendText: (inputText: string) => {
      const conditions = [
        {
          ruleHint: `输入时，如果当前金额为'0.00'，则清空金额`,
          check: () => get().amount === '0.00',
          action: () => {
            set({ amount: '' })
          },
        },
        {
          ruleHint: `小数点后已经有两位数字，则不能再输入`,
          check: () => /\.\d{2}/.test(get().amount),
          action: () => {
            inputText = ''
          },
        },
        {
          ruleHint: `已经有'.'，则不能再输入'.'`,
          check: () => get().amount.includes('.') && inputText === '.',
          action: () => {
            inputText = ''
          },
        },
        {
          ruleHint: `输入'.'，判断当前金额是否为空，是则首位补零`,
          check: () => inputText === '.' && get().amount === '',
          action: () => {
            set({ amount: '0' })
          },
        },
        {
          ruleHint: `输入 '0'，判断金额是否为'0'，是则不输入`,
          check: () => get().amount === '0' && inputText === '0',
          action: () => {
            inputText = ''
          },
        },
        {
          ruleHint: `输入 '1' ~ ' 9'，判断当前金额是否为'0'，是则替换为 '1' ~ ' 9'`,
          check: () => /[1-9]/g.test(inputText) && get().amount === '0',
          action: () => {
            set({ amount: inputText })
            inputText = ''
          },
        },
        {
          ruleHint: `位数超过10位数字，则不能再输入，并提示`,
          check: () => get().amount.replace('.', '').length >= 10,
          action: () => {
            inputText = ''
            emit('hint')
          },
        },
      ]

      conditions?.forEach((condition) => {
        if (condition.check()) {
          condition.action()
        }
      })

      set((state) => ({ amount: state.amount + inputText }))
    },
    backspaceText: () => {
      set((state) => ({ amount: state.amount.slice(0, -1) }))
      // 删空则补零
      if (get().amount === '') {
        set({ amount: '0.00' })
      }
    },
    clearText: () => {
      set({ amount: '0.00' })
    },
  })
)
