import { useState, type FormEventHandler } from 'react'
import { EmojiSelector } from '@/components/form/item/emoji/EmojiSelector'
import { cn } from 'cn'
import { GradientBanner } from '@/components/GradientBanner'
import { TopNav } from '@/components/TopNav'
import { SvgIcon } from '@/components/SvgIcon'
import { InputText } from '@/components/form/item/InputText'

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
  const Icon = <SvgIcon name="back-arrow" className="" />
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }
  const [emoji, setEmoji] = useState('')
  const [emojiHint, setEmojiHint] = useState('')

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

        <section className="form-item-sc">
          <label className="form-label-sc">
            符号
            <span text-22px>{emoji}</span>
            <span className="animate-rainbow color-[var(--vp-c-brand-next)]">{emojiHint}</span>
          </label>
          <EmojiSelector
            onChangeEmojiUnicode={setEmoji}
            onChangeEmojiHint={setEmojiHint}
            className="form-item-content-sc"
          />
          <span className="form-item-error-sc">不能为空</span>
        </section>

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
