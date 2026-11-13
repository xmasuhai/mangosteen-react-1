import type { JSONValue } from '@/global'
import { type FormErrorsType, type FormRules, formValidate } from '@/lib/validator/formValidate'
import { create } from 'zustand'

export type SignInFormData = { email: string; code: string }

interface SignInState {
  data: SignInFormData
  error: FormErrorsType<SignInFormData>
}

interface SignInAction {
  setData: (data: Partial<SignInFormData>) => void
  setError: (error: Partial<FormErrorsType<SignInFormData>>) => void
  clearError: (key?: keyof SignInFormData) => void
  revalidateFormItems: <T extends SignInFormData>(
    formData: Partial<T>,
    formRules: FormRules<T>,
    lastError?: FormErrorsType<T>
  ) => void
}

export const useSignInStore = create<SignInState & SignInAction>()((set, get) => ({
  data: { email: '', code: '' },
  error: { email: [], code: [] },
  setData: (data: Partial<SignInFormData>) => {
    set((state) => ({
      ...state,
      data: { ...state.data, ...data },
    }))
  },
  setError: (error: Partial<FormErrorsType<SignInFormData>>) => {
    set((state) => ({
      ...state,
      error: { ...state.error, ...error },
    }))
  },
  clearError: (key?: keyof SignInFormData) => {
    set((state) => ({
      ...state,
      error: key ? { ...state.error, [key]: [] } : { email: [], code: [] },
    }))
  },
  revalidateFormItems: <T extends SignInFormData>(
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
