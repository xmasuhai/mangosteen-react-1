import type { FormEventHandler } from 'react'
import { EmojiSelector } from '@/modules/tags/emoji/EmojiSelector.tsx'
import { cn } from 'cn';
import { GradientBanner } from '@/components/GradientBanner';
import { TopNav } from '@/components/TopNav';
import { SvgIcon } from '@/components/SvgIcon';

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
export const TagCreatePage: React.FC<Props> = ({/* className, */ }) => {
  const Icon = <SvgIcon name="back-arrow" className="" />
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    <div className={cn('container w-screen h-screen relative')}>
      <GradientBanner>
        <TopNav title="新建标签" icon={Icon} />
      </GradientBanner>

      <div className="px-[1em]">
        <form onSubmit={onSubmit}>
          <div>
            <span>标签名</span>
            <input className="form-input-text-sc" />
            <span>标签名太长</span>
          </div>

          <div>
            <span>符号 😄</span>
            <EmojiSelector />
          </div>

          <p>记账时长按即可进行编辑</p>

          <div>
            <button type="submit" className="primary-btn">
              确定
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
