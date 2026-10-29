import { Item, Resources, ResponseData } from "@/global"
import type { ResponseParams } from "@/mock/mockType"
import { defineMock } from 'vite-plugin-mock-dev-server'

let id = 0
const createId = () => {
  id += 1
  return id
}

const createMockItem = (attrs?: Partial<Item>): Item => ({
  id: createId(),
  user_id: 1,
  amount: 100,
  kind: 'incomes',
  tag_ids: [],
  happened_at: '2027-10-07T00:00:00.000Z',
  created_at: '2027-10-07T00:00:00.000Z',
  updated_at: '2027-10-07T00:00:00.000Z',
  ...attrs,
})

const createMockItemList = (n: number, attrs?: Partial<Item>): Item[] =>
  Array.from({ length: n })
    .map(() => createMockItem(attrs))

export const createItemsMockResponse = (
  {
    perPage = 10,
    page = 1,
    count = 10,
  },
  attrs?: Partial<Item>,
) => {
  return {
    code: 0,
    data: {
      resources: createMockItemList(perPage, attrs),
      pager: {
        page,
        per_page: perPage,
        count,
      },
    },
  }
}

export default defineMock({
  url: '/api/v1/items',
  method: 'get',
  body({ query }: ResponseParams): ResponseData<Partial<Resources<Item>>> {
    return createItemsMockResponse({
      count: 100,
      perPage: 10,
      page: parseInt(query.page) ?? 1,
    })
  },
})
