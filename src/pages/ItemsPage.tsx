import { AddItemFloatButton } from "@/components/AddItemFloatButton"
import { DateRangePicker, DateTabRangeStr } from "@/components/DateRangePicker"
import { FloatingOverlayMenu } from "@/components/FloatingOverlayMenu"
import { TopNav } from "@/components/TopNav"
import { ItemsSummary } from "@/modules/items/ItemsSummary"
import { cn } from "cn"
import React from "react"
import { useState } from "react"

export const ItemsPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<DateTabRangeStr>('thisMonth')
  return (
    <div className={cn('container w-screen h-screen relative')}>
      <header
        className={cn(
          'bg-linear-to-b from-[var(--welcome-card-start)] to-[var(--welcome-card-end)]',
        )}>
        <TopNav />
        <DateRangePicker selectedId={selectedDate} onSelected={setSelectedDate} />
      </header>

      <main className="max-h-[calc(100vh-112px)]">
        <ItemsSummary startDate={selectedDate} endDate={selectedDate} />

        <AddItemFloatButton />

        <FloatingOverlayMenu />
      </main>
    </div>
  )
}
