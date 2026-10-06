import { axiosInstance } from '@/lib/request/axiosInstances'

export const request = {
  get: <T>(path: string) => {
    return axiosInstance.get<T>(path)
  },
  post: () => { },
  patch: () => { },
  delete: () => { },
}
