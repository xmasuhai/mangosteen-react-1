import { FormEventHandler } from 'react'

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
          <div>
            <nav>
              <menu className="flex flex-nowrap">
                <li>表情</li>
                <li>手势</li>
                <li>食物</li>
                <li>动物</li>
                <li>植物</li>
                <li>自然</li>
                <li>人物</li>
              </menu>
            </nav>

            <ol></ol>
          </div>
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
