import { cn } from "cn"

export type DateTabRangeStr = 'thisMonth' | 'lastMonth' | 'thisYear' | 'customDate'

interface Props {
  selectedId: DateTabRangeStr
  onSelected: (selectedId: DateTabRangeStr) => void
}

export const DateRangePicker: React.FC<Props> = ({
  selectedId = 'thisMonth',
  onSelected,
}) => {
  const dateRanges: { key: DateTabRangeStr; text: string, }[] = [
    { key: 'thisMonth', text: '本月', },
    { key: 'lastMonth', text: '上月', },
    { key: 'thisYear', text: '今年', },
    { key: 'customDate', text: '去自定义日期', },
  ]

  const selectedClass = (tabId: string) =>
    selectedId === tabId
      ? cn(
        'relative',
        `after:(content-[""] block absolute bottom-0 left-0 w-full h-4px bg-[var(--tabs-indicator-bg)])`,
      )
      : ''
  return (
    <nav className="">
      <menu className={cn(
        'flex text-white',
        'children:(px-24px py-12px cursor-pointer)',
      )}>
        {
          dateRanges.map(item => (
            <li
              key={item.key}
              onClick={() => onSelected(item.key)}
              className={selectedClass(item.key)}>
              {item.text}
            </li>
          ))
        }
      </menu>
    </nav>
  )
}
