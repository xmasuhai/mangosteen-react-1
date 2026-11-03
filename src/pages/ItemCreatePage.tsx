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
const tabItems = [
  { key: 'expenses', text: '支出' },
  { key: 'incomes', text: '收入' },
] as const

export const ItemCreatePage: React.FC<Props> = ({ /* className, */ }) => {
  const Icon = (<SvgIcon name="back-arrow" className="size-[24px]" />)

  const [selectedKey, setSelectedKey] = useState<TabKey>('incomes')

  return (
    <div className={cn('container w-screen h-screen relative')}>
      <GradientBanner>
        <TopNav icon={Icon} title="记一笔" />
        <SwitchTabs
          selectedTabKey={selectedKey}
          tabItems={tabItems}
          onSwitchTab={(key: TabKey) => { setSelectedKey(key) }}
          className={cn('[&>menu>li]:(grow-1 text-center)')}/>
      </GradientBanner>
    </div>
  )
}
