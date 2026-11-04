import { GradientBanner } from "@/components/GradientBanner";
import { SvgIcon } from "@/components/SvgIcon";
import { SwitchTabs } from "@/components/SwitchTabs";
import { TopNav } from "@/components/TopNav";
import { cn } from "cn";
import { useState } from "react";

interface Props {
  className?: string
}

type TabKey = 'incomes' | 'expenses'
interface TabItem {
  key: TabKey
  text: string
  tabContent?: React.ReactNode
}
const tabItems: Readonly<Array<TabItem>> = [
  { key: 'expenses', text: '支出', tabContent: <div>支出</div>, },
  { key: 'incomes', text: '收入', tabContent: <div>收入</div>, },
] as const

export const ItemCreatePage: React.FC<Props> = ({ className, }) => {
  const Icon = (<SvgIcon name="back-arrow" className="size-[24px]" />)
  const [selectedKey, setSelectedKey] = useState<TabKey>('expenses')

  return (
    <div className={cn('container w-screen h-screen relative', className)}>
      <GradientBanner>
        <TopNav icon={Icon} title="记一笔" />
      </GradientBanner>

      <SwitchTabs
        classPrefix="fuck"
        selectedTabKey={selectedKey}
        tabItems={tabItems}
        onSwitchTab={(key: TabKey) => { setSelectedKey(key) }}
        className={cn('[&>nav>menu>li]:(grow-1 text-center bg-[var(--welcome-card-end)])')} />
    </div>
  )
}
