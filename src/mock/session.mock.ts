import type { ResponseData } from '@/global'
import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock({
  url: '/api/v1/session',
  method: 'post',
  status: 200,
  delay: 800,
  body(): ResponseData<{ jwt: string }> {
    return {
      code: 200,
      data: {
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKx',
      },
    }
  },
})
