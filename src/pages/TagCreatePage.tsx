import type { FormEventHandler } from 'react'
import { EmojiSelector } from '@/modules/tags/emoji/EmojiSelector.tsx'

interface Props {
  className?: string
}

export const TagCreatePage: React.FC<Props> = ({/* className, */}) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
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
  )
}
