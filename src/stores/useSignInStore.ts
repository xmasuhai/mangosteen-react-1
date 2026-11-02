import { create } from 'zustand'

type FormData = { email: string; code: string }

interface SignIn {
  data: FormData
  setData: (data: Partial<FormData>) => void
}

export const useSignInStore = create<SignIn>()((set, /* get */) => ({
  data: {
    email: '',
    code: '',
  },
  setData: (data: Partial<FormData>) => set((state) => ({ data: { ...state.data, ...data, } })),
}))
