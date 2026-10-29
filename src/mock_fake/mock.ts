import { ResponseData, Resource, User, Resources, Item } from '@/global'
import { createItemsMockResponse, } from '@/mock/items.mock'
import { ResponseParams } from '@/mock/mockType'
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/v1/me',
    method: 'get',
    timeout: 888,
    response: (): ResponseData<Resource<User>> => {
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
      }
    },
  },

  {
      url: '/api/v1/items',
      method: 'get',
      statusCode: 200,
      timeout: 888,
      response: ({ query }: ResponseParams): ResponseData<Partial<Resources<Item>>> => {
        const aa =
          createItemsMockResponse({
            count: 100,
            perPage: 10,
            page: parseInt(query.page) ?? 1,
          })

        console.log('itemsMock_______________________')
        console.log('%c⧭', 'color: #0088cc', aa);
        console.log('_______________________itemsMock')
        return aa
      },
    },
] satisfies MockMethod[]
