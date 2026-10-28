import { AddItemFloatButton } from "@/components/AddItemFloatButton"
import { DateRangePicker, DateTabRangeStr } from "@/components/DateRangePicker"
import { FloatingOverlayMenu } from "@/components/FloatingOverlayMenu"
import { TopNav } from "@/components/TopNav"
import { ItemsSummary } from "@/modules/items/ItemsSummary"
import { cn } from "cn"
import React from "react"
import { useState } from "react"

export const MenuContext = React.createContext({ setVisible: (visible: boolean) => { } })

export const ItemsPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<DateTabRangeStr>('thisMonth')
  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <div>
      <MenuContext.Provider value={{ setVisible: setMenuVisible }} >
        <header
          className={cn(
            'bg-linear-to-b from-[var(--welcome-card-start)] to-[var(--welcome-card-end)]',
          )}>
          <TopNav />
          <DateRangePicker selectedId={selectedDate} onSelected={setSelectedDate} />
        </header>

        <ItemsSummary startDate={selectedDate} endDate={selectedDate} />

        <AddItemFloatButton />

        { menuVisible && <FloatingOverlayMenu /> }
      </MenuContext.Provider>
    </div>
  )
}
