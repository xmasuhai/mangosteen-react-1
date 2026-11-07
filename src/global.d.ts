export interface Resource<T> {
  resource: T
}

export interface Resources<T> {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
    page_size?: number
    total?: number
  }
}

export interface User {
  id: number
  email: string
  name: string
  created_at: ISOString
  updated_at: ISOString
}

// 账目信息
export interface Item {
  id: number
  user_id: string | number
  kind: 'incomes' | 'expenses'
  amount: number
  note?: string
  tag_ids: number[]
  happened_at: ISOString
  created_at: ISOString
  updated_at: ISOString
  deleted_at?: ISOString
  // tags?: []
}

export interface ResponseData<T> {
  code: number
  data: T
}

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | JSONValue[]

export type TabKind = Item['kind'] // 'incomes' | 'expenses'

export declare module 'react' {
  interface CSSProperties {
    // 允许任意以 -- 开头的 CSS 变量 --date-item-height
    [key: `--${string}`]: string | number | undefined
  }
}
