import { Resource, ResponseData, User } from "@/global"
import { defineMock } from "vite-plugin-mock-dev-server"

export default defineMock({
  url: '/api/v1/me',
  method: 'get',
  status: 200,
  delay: 1800,
  body(): ResponseData<Resource<User>> {
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
})
