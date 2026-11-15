import type { PickedTag, TabKind } from '@/global'
import type { FormErrorsType } from '@/lib/validator/formValidate'
import { createFormStore } from './createFormStore'

type FormSubmitData = PickedTag & { kind?: TabKind; id: number; sign_id: number }
type FormValidateData = PickedTag

const genInitData = (): FormSubmitData => ({
  id: 0,
  kind: 'expenses',
  name: '',
  sign_id: 0,
  sign: '',
})

const genInitError = (): FormErrorsType<FormValidateData> => ({ name: [], sign: [] })

export const useTagEditStore = createFormStore<FormSubmitData, FormValidateData>({
  genInitData,
  genInitError,
  mode: 'edit',
})
