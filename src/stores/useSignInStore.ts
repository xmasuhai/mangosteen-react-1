import { FormErrorsType } from '@/lib/validator/formValidate';
import { create } from 'zustand'

export type SignInFormData = { email: string; code: string }

interface SignIn {
  data: SignInFormData
  error: FormErrorsType<SignInFormData>
  setData: (data: Partial<SignInFormData>) => void
  setError: (error: Partial<FormErrorsType<SignInFormData>>) => void
  clearError: (key?: keyof SignInFormData) => void
}

export const useSignInStore = create<SignIn>()((set, /* get */) => ({
  data: { email: '', code: '', },
  error: { email: [], code: [], },
  setData: (data: Partial<SignInFormData>) => {
    set((state) => ({
      ...state,
      data: { ...state.data, ...data, },
    }))
  },
  setError: (error: Partial<FormErrorsType<SignInFormData>>) => {
    set((state) => ({
      ...state,
      error: { ...state.error, ...error, },
    }))
  },
  clearError: (key?: keyof SignInFormData) => {
    set((state) => ({
      ...state,
      error: key ? { ...state.error, [key]: [], } : { email: [], code: [], },
    }))
  },
}))
