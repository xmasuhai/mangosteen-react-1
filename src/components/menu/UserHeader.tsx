import { cn } from "cn"

interface Props {
  className?: string
}

export const UserHeader: React.FC<Props> = ({ className, }) => {
  return (
    <div
      className={cn(
        'bg-[var(--main)] text-white w-full',
        'pt-2em pb-44px px-1em',
        className,
      )}>
      <h2 className="text-[24px]">未登录用户</h2>
      <div className="text-[var(--user-text)]">点击这里登录</div>
    </div>
  )
}
