import { GradientBanner } from '@/components/GradientBanner'
import { SvgIcon } from '@/components/SvgIcon'
import { TopNav } from '@/components/TopNav'
import { TagForm } from '@/modules/tags/TagForm'
import { cn } from 'cn'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface Props {
  className?: string
}

/*
 * @Description: 编辑标签 /tags/:id
 * @Author: xmasuhai
 * @Email: xmasuhai@163.com
 * @Date: 2026-11-14 12:43:28
 * @Last Modified by:   xmasuhai
 * @Last Modified time: 2026-11-14 13:02:27
 * @FilePath: @/pages/TagEditPage.tsx
 */
export const TagEditPage: React.FC<Props> = ({ className }) => {
  const Icon = <SvgIcon name="back-arrow" className="size-[24px]" />
  const params = useParams()
  // const { setData } = useTagCreateStore()
  useEffect(() => {
    const id = params.id
    if (!id) {
      throw new Error('id is required')
    }
    // TODO: 获取标签详情
    // setData()
    console.log('%c⧭', 'color: #5200cc', params)
  }, [params])

  return (
    <div className={cn('container w-screen h-screen relative', className)}>
      <GradientBanner>
        <TopNav title="标签详情" icon={Icon} />
      </GradientBanner>

      <TagForm />
    </div>
  )
}
