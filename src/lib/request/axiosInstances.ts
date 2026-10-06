import axios from 'axios'

axios.defaults.baseURL = __IS_DEV__ ? '/' : 'https://xx.xxx.xxx.xx:x0x0/api/v1'
// axios.defaults.headers.common.Authorization = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 2500

export const axiosInstance = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'fooBar' },
})
