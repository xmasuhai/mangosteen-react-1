import axios from 'axios'
import useSWR from 'swr'

function fetcher(urlPath: string) {
  return axios.get<{ args: { name: string, age: number } }>(urlPath)
}

export const Home: React.FC = () => {
  const { data, error } = useSWR(`https://echo.apifox.com/get?name=frank&age=18`, fetcher)
  if (error) { return <div>Error, failed to load</div> }
  if (!data) { return <div>Loading...</div> }

  window.console.log('useSWR_______________________')
  window.console.log('error', error)
  window.console.log('data?.data', data?.data)
  window.console.log('_______________________useSWR')

  return (
    <div text-6xl>{data?.data.args.name + data?.data.args.age}</div>
  )
}
