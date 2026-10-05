import axios from 'axios'
import useSWR from 'swr'

function fetcher(urlPath: string) {
  return axios.get<{ args: { name: string, age: number } }>(urlPath)
}

export const Home: React.FC = () => {
  const { data, error, isValidating, isLoading } = useSWR(`https://echo.apifox.com/get?name=frank&age=18`, fetcher)
  if (isLoading) { return <div text-6xl>骨架屏加载中...</div> }
  if (error) { return <div text-6xl>Error, failed to load</div> }
  if (!data) { return <div text-6xl>Loading...</div> }
  if (isValidating) { return <div text-6xl>正在获取最新数据...</div> }

  window.console.log('useSWR_______________________')
  window.console.log('error', error)
  window.console.log('data?.data', data?.data)
  window.console.log('_______________________useSWR')

  return (
    <div text-6xl>{data?.data.args.name + data?.data.args.age}</div>
  )
}
