import { type FormEventHandler } from 'react'
import { cn } from 'cn'
import { GradientBanner } from '@/components/GradientBanner'
import { TopNav } from '@/components/TopNav'
import { SvgIcon } from '@/components/SvgIcon'
import { InputText } from '@/components/form/item/InputText'
import { InputEmoji } from '@/components/form/item/InputEmoji'

interface Props {
  className?: string
}

/*
 * @Author: xmasuhai xmasuhai@163.com
 * @Date: 2026-11-11 19:16:37
 * @LastEditors: xmasuhai xmasuhai@163.com
 * @LastEditTime: 2026-11-11 23:18:30
 * @FilePath: /mangosteen-react-1/src/pages/TagCreatePage.tsx
 */
export const TagCreatePage: React.FC<Props> = ({ className }) => {
  const Icon = <SvgIcon name="back-arrow" className="size-[24px]" />
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    <div className={cn('container w-screen h-screen relative', className)}>
      <GradientBanner>
        <TopNav title="新建标签" icon={Icon} />
      </GradientBanner>

      <form onSubmit={onSubmit} className="form-sc">
        <InputText
          label="标签名"
          labelFor="tag-name"
          placeholder="请输入标签名称"
          ifUseLabelTag={true}
          errorHint="标签名太长"
        />

        <InputEmoji label="符号" errorHint="不能为空" />

        <p className="form-item-sc text-center">记账时长按即可进行编辑</p>

        <div className="form-item-sc">
          <button type="submit" className="primary-btn">
            确定
          </button>
        </div>
      </form>
    </div>
  )
}
