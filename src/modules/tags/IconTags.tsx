import { SvgIcon } from '@/components/SvgIcon'
import type { TabKind } from '@/global'
import { IconTagItem } from '@/modules/tags/IconTagItem'
import { cn } from 'cn'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  className?: string
  kind: TabKind
}

const tags = Array.from({ length: 98 }, (_, i) => i + 1)

export const IconTags: React.FC<Props> = ({ className, kind }) => {
  console.log('IconTags %c⧭ kind', 'color: #007300', kind)

  const [selectedTabKey, setSelectedTabKey] = useState<string>('1')

  const navigate = useNavigate()
  const toCreateTagPage = () => {
    console.log('toCreateTagPage_______________________')
    console.log('_______________________toCreateTagPage')
    navigate(`/tags/create?kind=${kind}`)
  }
  return (
    <div className={cn(className)}>
      <ol
        className={cn(
          'grid place-items-center justify-center grid-cols-[repeat(auto-fit,3em)]',
          'py-1em px-.5em gap-x-[2em] gap-y-[1em]'
        )}>
        <IconTagItem tagKey="add" tagName="添加" onClick={toCreateTagPage}>
          <SvgIcon name="add" className="size-[24px] fill-[var(--main)]" />
        </IconTagItem>
        {tags.map((tag) => (
          <IconTagItem
            key={tag}
            selectedKey={selectedTabKey}
            onSelectKey={setSelectedTabKey}
            tagKey={`${tag}`}
            tagName="打的"
            tagSign="🤑"
          />
        ))}
      </ol>
    </div>
  )
}
