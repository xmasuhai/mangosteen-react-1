export interface Resource<T> {
  resource: T
}

export interface Resources<T> {
  resource: T[]
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
  user_id: number
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
