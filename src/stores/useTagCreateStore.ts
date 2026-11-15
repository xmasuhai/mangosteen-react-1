import type { PickedTag, TabKind } from '@/global'
import type { FormErrorsType } from '@/lib/validator/formValidate'
import { createFormStore } from './createFormStore'

type FormSubmitData = PickedTag & { kind?: TabKind; sign_id: number }
type FormValidateData = PickedTag

const genInitData = (): FormSubmitData => ({
  kind: 'expenses',
  name: '',
  sign_id: 0,
  sign: '',
})

const genInitError = (): FormErrorsType<FormValidateData> => ({ name: [], sign: [] })

export const useTagCreateStore = createFormStore<FormSubmitData, FormValidateData>({
  genInitData,
  genInitError,
  mode: 'create',
})
