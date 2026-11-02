import { FormErrorsType } from '@/lib/validator/formValidate';
import { create } from 'zustand'

type FormData = { email: string; code: string }

interface SignIn {
  data: FormData
  error: FormErrorsType<FormData>
  setData: (data: Partial<FormData>) => void
  setError: (error: Partial<FormErrorsType<FormData>>) => void
  clearError: () => void
}

export const useSignInStore = create<SignIn>()((set, /* get */) => ({
  data: {
    email: '',
    code: '',
  },
  error: {
    email: [],
    code: [],
  },
  setData: (data: Partial<FormData>) => {
    set((state) => ({
      ...state,
      data: { ...state.data, ...data, },
    }))
  },
  setError: (error: Partial<FormErrorsType<FormData>>) => {
    set((state) => ({
      ...state,
      error: { ...error, },
    }))
  },
  clearError: () => {
    set((state) => ({
      ...state,
      error: { email: [], code: [], },
    }))
  },
}))
