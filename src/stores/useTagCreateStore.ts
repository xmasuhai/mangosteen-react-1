import type { PickedTag, TabKind } from '@/global'
import type { FormErrorsType } from '@/lib/validator/formValidate'
import { createFormStore } from './createFormStore'

type FormSubmitData = PickedTag & { kind?: TabKind }
type FormValidateData = PickedTag

const genInitData = (): FormSubmitData => ({
  kind: 'expenses',
  name: '',
  sign: '',
})

const genInitError = (): FormErrorsType<FormValidateData> => ({ name: [], sign: [] })

export const useTagCreateStore = createFormStore<FormSubmitData, FormValidateData>({
  genInitData,
  genInitError,
})
