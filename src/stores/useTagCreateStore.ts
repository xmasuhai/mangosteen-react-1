import type { PickedTag, TabKind } from '@/global'
import { formValidate, type FormErrorsType, type FormRules } from '@/lib/validator/formValidate'
import { create } from 'zustand'

type PickedTagFormError = FormErrorsType<PickedTag>
interface TagCreateState {
  data: Partial<PickedTag>
  error?: PickedTagFormError
}
interface TagCreateAction {
  setData: (data: Partial<PickedTag & { kind: TabKind }>) => void
  setError: (error: Partial<PickedTagFormError>) => void
  clearError: (key?: keyof PickedTag) => void
  revalidateFormItems: <T extends PickedTag>(
    formData: Partial<T>,
    formRules: FormRules<T>,
    lastError?: FormErrorsType<T>
  ) => void
}

const genInitData = () => ({ kind: 'expenses', name: '', sign: '' })
const genInitError = () => ({ name: [], sign: [] })

export const useTagCreateStore = create<TagCreateState & TagCreateAction>()((set, get) => ({
  data: genInitData(),
  error: genInitError(),
  setData: (data: Partial<PickedTag>) => {
    set((state) => ({
      ...state,
      data: { ...state.data, ...data },
    }))
  },
  setError: (error: Partial<PickedTagFormError>) => {
    set((state) => ({
      ...state,
      error: { ...state.error, ...error },
    }))
  },
  clearError: (key?: keyof PickedTag) => {
    set((state) => ({
      ...state,
      error: key ? { ...state.error, [key]: [] } : genInitError(),
    }))
  },
  revalidateFormItems: <T extends PickedTag>(
    formData: Partial<T>,
    formRules: FormRules<T>,
    lastError?: FormErrorsType<T>
  ) => {
    get().clearError()
    const keys = Object.keys(formData)
    const validatingRules = formRules.filter((rule) => keys.includes(String(rule.key)))
    const formError = formValidate(formData, validatingRules)
    get().setError({ ...lastError, ...formError })
  },
}))
