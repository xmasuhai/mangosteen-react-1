export interface lineChartsItem {
  x: number | string
  y: number
}

export interface pieChartsItem {
  name: string
  value: number
}

export interface RankChartItem {
  id: number
  tag: { sign: string; name: string; tag_id: number }
  amount: number
  percent: number
}
