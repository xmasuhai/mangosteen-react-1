import { GradientBanner } from '@/components/GradientBanner'
import { SvgIcon } from '@/components/SvgIcon'
import { SwitchTabs } from '@/components/SwitchTabs'
import { TopNav } from '@/components/TopNav'
import type { TabKind } from '@/global'
import { InputPad } from '@/modules/items/input/InputPad'
import { IconTags } from '@/modules/tags/IconTags'
import { cn } from 'cn'
import { useState } from 'react'

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
    key: 'expenses',
    text: '支出',
    tabContent: <IconTags kind="expenses" />,
  },
  { key: 'incomes', text: '收入', tabContent: <IconTags kind="incomes" /> },
] as const

export const ItemCreatePage: React.FC<Props> = ({ className }) => {
  const Icon = <SvgIcon name="back-arrow" className="flip-360 size-[24px]" />
  const [selectedKey, setSelectedKey] = useState<TabKind>('expenses')
  return (
    <div className={cn('container w-screen h-screen relative flex flex-col', className)}>
      <GradientBanner className="grow-0 shrink-0">
        <TopNav icon={Icon} title="记一笔" />
      </GradientBanner>

      <SwitchTabs
        selectedTabKey={selectedKey}
        tabItems={tabItems}
        onSwitchTab={(key: TabKind) => {
          setSelectedKey(key)
        }}
        className={cn(
          'grow-1 shrink-1 overflow-hidden',
          '[&>nav>menu>li]:(grow-1 text-center bg-[var(--welcome-card-end)])',
          'max-h-[calc(var(--main-vh,100vh)-364px)]'
        )}
      />

      <section className="grow-0 shrink-0 min-h-[300px]">
        <InputPad />
      </section>
    </div>
  )
}
