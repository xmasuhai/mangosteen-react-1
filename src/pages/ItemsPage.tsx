import { AddItemFloatButton } from "@/components/AddItemFloatButton"
import { DateRangePicker, DateTabRangeStr } from "@/components/DateRangePicker"
import { FloatingOverlayMenu } from "@/components/FloatingOverlayMenu"
import { GradientBanner } from "@/components/GradientBanner"
import { SvgIcon } from "@/components/SvgIcon"
import { TopNav } from "@/components/TopNav"
import { ItemsList } from "@/modules/items/ItemsList"
import { ItemsSummary } from "@/modules/items/ItemsSummary"
import { useMenuStore } from "@/stores/useMenuStore"
import { cn } from "cn"
import { useState } from "react"

export const ItemsPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<DateTabRangeStr>('thisMonth')
  const { visible, setVisible, } = useMenuStore()
  const onClickMenu = () => {
    setVisible(!visible)
  }
  const Icon = (<SvgIcon name="menu" className="size-[24px]" onClick={onClickMenu} />)

  return (
    <div className={cn('container w-screen h-screen relative')}>
      <GradientBanner>
        <TopNav icon={Icon} title="山竹记账" />
      </GradientBanner>

      <DateRangePicker
        selectedId={selectedDate}
        onSelect={setSelectedDate} />

      <main className="max-h-[calc(100svh-112px)]">
        <div className="relative max-h-[calc(100svh-112px)] flex flex-col">
          <ItemsSummary startDate={selectedDate} endDate={selectedDate} />

          <ItemsList startDate={selectedDate} endDate={selectedDate} />
        </div>

        <AddItemFloatButton />

        <FloatingOverlayMenu />
      </main>
    </div>
  )
}
