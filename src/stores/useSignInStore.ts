import { createFormStore } from './createFormStore'

export type SignInFormData = { email: string; code: string }

const genInitData = () => ({ email: '', code: '' })
const genInitError = () => ({ email: [], code: [] })

export const useSignInStore = createFormStore<SignInFormData, SignInFormData>({
  genInitData,
  genInitError,
})
