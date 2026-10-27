import { AddItemFloatButton } from "@/components/AddItemFloatButton"
import { DateRangePicker } from "@/components/DateRangePicker"
import { TopNav } from "@/components/TopNav"
import { ItemsList } from "@/modules/items/ItemsList"
import { ItemsSummary } from "@/modules/items/ItemsSummary"
import { cn } from "cn"

export const ItemsPage: React.FC = () => {

  return (
    <div>
      <header
        class={cn(
          'bg-linear-to-b from-[var(--welcome-card-start)] to-[var(--welcome-card-end)]',
        )}>
        <TopNav />
        <DateRangePicker />
      </header>

      <ItemsSummary />
      <ItemsList />

      <AddItemFloatButton />
    </div>
  )
}
