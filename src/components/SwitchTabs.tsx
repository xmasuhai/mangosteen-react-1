import { cn } from "cn";

interface Props<T> {
  className?: string
  selectedTabKey: T
  tabItems: Readonly<Array<{ key: T; text: string }>>
  onSwitchTab: (key: T) => void
}

export const SwitchTabs = <T extends string>({ className, tabItems, selectedTabKey, onSwitchTab, }: Props<T>) => {
  const selectedClass = (key: string) => cn(
    'relative',
    key === selectedTabKey
      ? 'after:(content-[""] block absolute bottom-0 left-0 w-full h-4px bg-[var(--tabs-indicator-bg)])'
      : ''
  )

  return (
    <nav className={className}>
      <menu className={cn(
        'flex text-white',
        'children:(px-24px py-12px cursor-pointer)',
      )}>
        {
          tabItems.map(item => (
            <li
              key={item.key}
              onClick={() => onSwitchTab(item.key)}
              className={selectedClass(item.key)}>
              {item.text}
            </li>
          ))
        }
      </menu>
    </nav>
  )
}
