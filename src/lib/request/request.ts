import { axiosInstance } from '@/lib/request/axiosInstances'

export const request = {
  get: (path: string) => {
    return axiosInstance.get(path)
  },
  post: () => { },
  patch: () => { },
  delete: () => { },
}
