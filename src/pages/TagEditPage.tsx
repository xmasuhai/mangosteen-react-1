import { GradientBanner } from '@/components/GradientBanner'
import { SvgIcon } from '@/components/SvgIcon'
import { TopNav } from '@/components/TopNav'
import { getEmojiById } from '@/lib/helpers/getEmojiById'
import { TagForm } from '@/modules/tags/TagForm'
import { useEmojiStore } from '@/stores/useEmojiStore'
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
 * @Last Modified time: 2026-11-14 22:26:08
 * @FilePath: @/pages/TagEditPage.tsx
 */
export const TagEditPage: React.FC<Props> = ({ className }) => {
  const Icon = <SvgIcon name="back-arrow" className="size-[24px]" />
  const params = useParams()
  const { setData } = useTagEditStore()
  const { setEmoji } = useEmojiStore()

  useEffect(() => {
    const id = Number(params.id)
    if (!id) {
      throw new Error('id is required')
    }
    // TODO: 根据id 请求接口获取标签详情数据
    const mockData = {
      id,
      kind: 'incomes',
      name: '走水',
      sign: '\u{1F6B6}',
      sign_id: 415,
    } as const
    const emojiItem = getEmojiById(415)
    setData(mockData)
    setEmoji(emojiItem)

    console.log('TagEditPage_______________________')
    console.log('%c⧭ params', 'color: #9c87f0', params)
    console.log('%c⧭ emojiItem', 'color: #733d00', emojiItem)
    console.log('_______________________TagEditPage')
  }, [params, setEmoji, setData])

  return (
    <div className={cn('container w-screen h-screen relative', className)}>
      <GradientBanner>
        <TopNav title="标签详情" icon={Icon} />
      </GradientBanner>

      <TagForm mode="edit" submitButtonText="保存" />
    </div>
  )
}
