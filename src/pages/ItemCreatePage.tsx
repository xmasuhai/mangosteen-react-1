import { GradientBanner } from "@/components/GradientBanner";
import { SvgIcon } from "@/components/SvgIcon";
import { SwitchTabs } from "@/components/SwitchTabs";
import { TopNav } from "@/components/TopNav";
import { TabKind } from "@/global";
import { IconTags } from "@/modules/tags/IconTags";
import { cn } from "cn";
import { useState } from "react";

interface Props {
  className?: string
}

interface TabItem {
  key: TabKind
  text: string
  tabContent?: React.ReactNode
}
const tabItems: Readonly<Array<TabItem>> = [
  {
    key: 'expenses', text: '支出', tabContent: <IconTags kind="expenses" />, },
  { key: 'incomes', text: '收入', tabContent: <IconTags kind="incomes" />, },
] as const

export const ItemCreatePage: React.FC<Props> = ({ className, }) => {
  const Icon = (<SvgIcon name="back-arrow" className="size-[24px]" />)
  const [selectedKey, setSelectedKey] = useState<TabKind>('expenses')
  return (
    <div className={cn('container w-screen h-screen relative', className)}>
      <GradientBanner>
        <TopNav icon={Icon} title="记一笔" />
      </GradientBanner>

      <SwitchTabs
        selectedTabKey={selectedKey}
        tabItems={tabItems}
        onSwitchTab={(key: TabKind) => { setSelectedKey(key) }}
        className={cn('[&>nav>menu>li]:(grow-1 text-center bg-[var(--welcome-card-end)])')} />
    </div>
  )
}
