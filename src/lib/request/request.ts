import type { JSONValue } from '@/global'
import { axiosInstance } from '@/lib/request/axiosInstances'

export const request = {
  get: <T>(path: string) => {
    return axiosInstance.get<T>(path)
  },
  post: <T>(path: string, data?: JSONValue) => {
    return axiosInstance.post<T>(path, data)
  },
  patch: () => {},
  delete: () => {},
}
