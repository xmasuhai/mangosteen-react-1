import { cn } from "cn";

interface Props<T> {
  className?: string
  classPrefix?: string
  selectedTabKey: T
  tabItems: Readonly<Array<{ key: T; text: string; tabContent?: React.ReactNode }>>
  onSwitchTab: (key: T) => void
}

export const SwitchTabs = <T extends string>({
  className,
  classPrefix,
  selectedTabKey,
  tabItems,
  onSwitchTab,
}: Props<T>) => {
  const selectedClass = (key: string) => cn(
    'relative',
    key === selectedTabKey
      ? 'after:(content-[""] block absolute bottom-0 left-0 w-full h-4px bg-[var(--tabs-indicator-bg)])'
      : ''
  )

  return (
    <div className={cn(className, classPrefix, 'flex flex-col',)}>
      {/* 切换标签导航 */}
      <nav className={cn(
        classPrefix ? `${classPrefix}-tab-nav` : 'tab-nav',
        'grow-0 shrink-0',
      )}>
        <menu className={cn(
          classPrefix ? `${classPrefix}-tab-menu` : 'tab-menu',
          'flex text-white',
          'children:(px-24px py-12px cursor-pointer)',
        )}>
          {
            tabItems.map(item => (
              <li
                key={item.key}
                onClick={() => onSwitchTab(item.key)}
                className={cn(
                  selectedClass(item.key),
                  classPrefix ? `${classPrefix}-tab-menu-item` : 'tab-menu-item',
                )}>
                {item.text}
              </li>
            ))
          }
        </menu>
      </nav>

      {/* 导航内容 */}
      <section className={cn(
        classPrefix ? `${classPrefix}-tab-content` : 'tab-content',
        'grow-1 shrink-1',
        'overflow-y-auto scrollbar-hide',
      )}>
        {tabItems.find(item => item.key === selectedTabKey)?.tabContent}
      </section>
    </div>
  )
}
