import { GradientBanner } from '@/components/GradientBanner'
import { SvgIcon } from '@/components/SvgIcon'
import { TopNav } from '@/components/TopNav'
import { TagForm } from '@/modules/tags/TagForm'
import { useTagEditStore } from '@/stores/useTagEditStore'
import { cn } from 'cn'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface Props {
  className?: string
}

/*
 * @Description: 编辑标签 /tags/edit/:id
 * @Author: xmasuhai
 * @Email: xmasuhai@163.com
 * @Date: 2026-11-14 12:43:28
 * @Last Modified by:   xmasuhai
 * @Last Modified time: 2026-11-14 19:39:49
 * @FilePath: @/pages/TagEditPage.tsx
 */
export const TagEditPage: React.FC<Props> = ({ className }) => {
  const Icon = <SvgIcon name="back-arrow" className="size-[24px]" />
  const params = useParams()
  const { data, setData } = useTagEditStore()

  useEffect(() => {
    const id = Number(params.id)
    if (!id) {
      throw new Error('id is required')
    }
    // TODO: 接口获取标签详情数据
    setData({ id, kind: 'incomes', name: '走水', sign: '🚶' })
    console.log('TagEditPage_______________________')
    console.log('%c⧭ params', 'color: #9c87f0', params)
    console.log('%c⧭ data', 'color: #5277cc', data)
    console.log('_______________________TagEditPage')
  }, [params])

  return (
    <div className={cn('container w-screen h-screen relative', className)}>
      <GradientBanner>
        <TopNav title="标签详情" icon={Icon} />
      </GradientBanner>

      <TagForm mode="edit" submitButtonText="保存" />
    </div>
  )
}
