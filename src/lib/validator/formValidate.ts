interface JSONValue {
  [key: string]: string | number | null | undefined | JSONValue
}

interface FormData {
  [key: string]: JSONValue
}

type FormRule<T> = {
  key: keyof T
  message: string
} & (
  { type: 'required'; required: boolean } |
  { type: 'chinese'; } |
  { type: 'pattern'; regexp: RegExp } |
  { type: 'notEqual'; value: JSONValue } |
  { type: 'equalField'; field: keyof T } |
  { type: 'length'; min?: number; max?: number }
)
type FormRules<T> = FormRule<T>[]
type FormErrorsType<T extends JSONValue> = { [k in keyof T]?: string[] }

export type { JSONValue, FormData, FormRule, FormRules, FormErrorsType, }

/**
 * @Description: 验证表单
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-18 22:02:08
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-19 21:00:05
 * @FilePath: src/shared/validator/formValidate.ts
 */
export const formValidate = <T extends JSONValue>(
  formData: T,
  rules: FormRules<T>,
): FormErrorsType<T> => {
  const errorHash: FormErrorsType<T> = {}

  rules.forEach((rule) => {
    const { key, message, type } = rule
    const pushMsgToErrorHash = () => {
      errorHash[key] ??= []
      errorHash[key].push(message)
    }
    const value = formData[key] satisfies JSONValue[string]
    switch (type) {
      case 'required':
        if (isEmpty(value)) { pushMsgToErrorHash() }
        break
      case 'pattern':
        if (!isEmpty(value) && !rule.regexp.test(value!.toString())) {
          pushMsgToErrorHash()
        }
        break
      case 'notEqual':
        if (!isEmpty(value) && value !== rule.value) {
          pushMsgToErrorHash()
        }
        break
      case 'length':
        if (isEmpty(value)) {break}
        if (rule.min !== undefined && value!.toString().length < rule.min) {
          pushMsgToErrorHash()
        }
        if (rule.max !== undefined && value!.toString().length > rule.max) {
          pushMsgToErrorHash()
        }
        break
      case 'chinese':
        if (!isEmpty(value) && !/^[\u4e00-\u9fa5]+$/.test(value!.toString())) {
          pushMsgToErrorHash()
        }
        break
      case 'equalField':
        if (!isEmpty(value) && value !== formData[rule.field]) {
          pushMsgToErrorHash()
        }
        break
      default:
        return
    }
  })
  return errorHash
}

export function isEmpty(value: JSONValue[string]) {
  return [null, undefined, ''].includes(value?.toString())
}
