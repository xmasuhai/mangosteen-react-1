import { MenuLinkItem } from "@/components/menu/MenuLinkItem"
import { cn } from "cn"

interface Props {
  className?: string
}
type MenuLinkItemType = {
  linkPath: string
  linkTitle: string
  iconName: string
}

const menuLinkItemList: Readonly<MenuLinkItemType[]> = Object.freeze([
  { linkPath: '/statistics', linkTitle: '统计图表', iconName: 'chart' },
  { linkPath: '/export', linkTitle: '导出数据', iconName: 'export' },
  { linkPath: '/notify', linkTitle: '记账提醒', iconName: 'notify' },
  { linkPath: '/tech_stack', linkTitle: '本App技术栈', iconName: 'tech_stack' },
])

export const MenuList: React.FC<Props> = ({ className, }) => {
  return (
    <nav
      className={cn(
        'menu-list',
        'bg-white text-20px py-1em',
        className,
      )}>
      <menu className={cn(
        'pt-1em text-20px',
        'flex flex-col justify-start',
      )}>
        {menuLinkItemList.map((item) => (
          <MenuLinkItem
            key={item.linkPath}
            linkPath={item.linkPath}
            linkTitle={item.linkTitle}
            iconName={item.iconName}
          />
        ))}
      </menu>
    </nav>
  )
}
