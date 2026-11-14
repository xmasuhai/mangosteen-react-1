import { useEffect } from 'react'
import { cn } from 'cn'
import { GradientBanner } from '@/components/GradientBanner'
import { TopNav } from '@/components/TopNav'
import { SvgIcon } from '@/components/SvgIcon'
import { useTagCreateStore } from '@/stores/useTagCreateStore'
import { useSearchParams } from 'react-router-dom'
import { TagForm } from '@/modules/tags/TagForm'

interface Props {
  className?: string
}

/*
 * @Description: 标签创建页 /tags/create?kind=incomes | expenses
 * @Author: xmasuhai xmasuhai@163.com
 * @Date: 2026-11-11 19:16:37
 * @LastEditors: xmasuhai xmasuhai@163.com
 * @LastEditTime: 2026-11-11 23:18:30
 * @FilePath: @/pages/TagCreatePage.tsx
 */
export const TagCreatePage: React.FC<Props> = ({ className }) => {
  const Icon = <SvgIcon name="back-arrow" className="size-[24px]" />
  const [searchParams] = useSearchParams()
  const { setData } = useTagCreateStore()

  useEffect(() => {
    const kind = searchParams.get('kind')
    if (!kind) {
      throw new Error('kind is required')
    }
    if (kind !== 'incomes' && kind !== 'expenses') {
      throw new Error('kind is invalid')
    }
    setData({ kind })
  }, [searchParams, setData])

  return (
    <div className={cn('container w-screen h-screen relative', className)}>
      <GradientBanner>
        <TopNav title="新建标签" icon={Icon} />
      </GradientBanner>

      <TagForm mode="create" submitButtonText="创建" />
    </div>
  )
}
