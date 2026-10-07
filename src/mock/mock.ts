import type { Item, Resource, Resources, ResponseData, User } from '@/global.d.ts'
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/v1/me',
    method: 'get',
    timeout: 1000,
    response: () => {
      return {
        code: 0,
        data: {
          resource: {
            id: 1,
            name: 'frank',
            email: 'frank@frank.com',
            updated_at: '2027-01-01T00:00:00.000Z',
            created_at: '2027-01-01T00:00:00.000Z',
          },
        },
      } satisfies ResponseData<Partial<Resource<User>>>
    },
  },
  {
    url: '/api/v1/items',
    method: 'get',
    timeout: 1000,
    response: (): ResponseData<Partial<Resources<Item>>> => {
      return {
        code: 0,
        data: {
          resources: [
            {
              id: 1,
              user_id: 1,
              amount: 100,
              kind: 'incomes',
              tag_ids: [],
              happened_at: '2027-10-07T00:00:00.000Z',
              created_at: '2027-10-07T00:00:00.000Z',
              updated_at: '2027-10-07T00:00:00.000Z',
            },
          ],
          pager: {
            page: 1,
            per_page: 25,
            count: 1,
          },
        },
      }
    },
  },
] as MockMethod[]
