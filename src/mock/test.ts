import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/v1/me',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          id: 1,
          email: 'frank@frank.com',
        },
      }
    },
  },
  {
    url: '/api/v1/items',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          resources: [
            {
              id: 1,
              user_id: 1,
              amount: 100,
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
