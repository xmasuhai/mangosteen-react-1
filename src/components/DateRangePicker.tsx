import { SwitchTabs } from "@/components/SwitchTabs";

export type DateTabRangeStr = 'thisMonth' | 'lastMonth' | 'thisYear' | 'customDate'

interface Props {
  selectedId: DateTabRangeStr
  onSelect: (key: DateTabRangeStr) => void
}

type DateRange = {
  key: DateTabRangeStr
  text: string
}

const dateRanges: Readonly<DateRange[]> = [
  { key: 'thisMonth', text: '本月', },
  { key: 'lastMonth', text: '上月', },
  { key: 'thisYear', text: '今年', },
  { key: 'customDate', text: '去自定义日期', },
]

export const DateRangePicker: React.FC<Props> = ({
  selectedId = 'thisMonth',
  onSelect,
}) => {
  return (
    <SwitchTabs
      selectedTabKey={selectedId}
      tabItems={dateRanges}
      onSwitchTab={onSelect}
      className="bg-[var(--welcome-card-end)]" />
  )
}
