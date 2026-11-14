import type { JSONValue } from '@/global'
import { create } from 'zustand'
import { formValidate, type FormErrorsType, type FormRules } from '@/lib/validator/formValidate'

export type FormStore<TData, TForm extends JSONValue> = {
  data: TData
  error: FormErrorsType<TForm>
  setData: (data: Partial<TData>) => void
  setError: (error: Partial<FormErrorsType<TForm>>) => void
  clearError: (key?: keyof TForm) => void
  revalidateFormItems: <T extends TForm>(
    formData: Partial<T>,
    formRules: FormRules<T>,
    lastError?: FormErrorsType<T>
  ) => void
}

export function createFormStore<TData, TForm extends JSONValue>(
  options: {
    genInitData: () => TData
    genInitError: () => FormErrorsType<TForm>
  }
) {
  return create<FormStore<TData, TForm>>()((set, get) => ({
    data: options.genInitData(),
    error: options.genInitError(),
    setData: (data: Partial<TData>) => {
      set((state) => ({
        ...state,
        data: { ...state.data, ...data },
      }))
    },
    setError: (error: Partial<FormErrorsType<TForm>>) => {
      set((state) => ({
        ...state,
        error: { ...state.error, ...error },
      }))
    },
    clearError: (key?: keyof TForm) => {
      set((state) => ({
        ...state,
        error: key ? { ...state.error, [key]: [] } : options.genInitError(),
      }))
    },
    revalidateFormItems: <T extends TForm>(
      formData: Partial<T>,
      formRules: FormRules<T>,
      lastError?: FormErrorsType<T>
    ) => {
      get().clearError()
      const keys = Object.keys(formData ?? {})
      const validatingRules = formRules.filter((rule) => keys.includes(String(rule.key)))
      const formError = formValidate(formData, validatingRules)
      get().setError({ ...lastError, ...formError } as Partial<FormErrorsType<TForm>>)
    },
  }))
}
