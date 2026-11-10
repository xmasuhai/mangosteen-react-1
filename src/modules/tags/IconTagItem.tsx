import { cn } from 'cn'
import React from 'react'

interface Props {
  className?: string
  tagKey: string
  tagName: string
  selectedKey?: string
  tagSign?: string
  children?: React.ReactNode
  onSelectKey?: (tagKey: string) => void
  onClick?: () => void
}

export const IconTagItem: React.FC<Props> = ({
  className,
  tagKey,
  tagName,
  tagSign,
  children,
  onSelectKey,
  selectedKey,
  onClick,
}) => {
  const onClickTab = () => {
    onSelectKey?.(tagKey)
    onClick?.()
  }
  return (
    <li
      onClick={onClickTab}
      className={cn(className, 'w-3em flex flex-col items-center justify-center gap-y-.5em')}>
      <span
        className={cn(
          'flex items-center justify-center',
          'where:(size-[48px] text-[24px] rounded-[50%])',
          'where:(b-1 bg-[var(--item-tag-bg)])',
          selectedKey === tagKey ? 'b-[var(--main)] b-1.5' : 'b-[var(--main)]/20'
        )}>
        {tagSign ?? children}
      </span>
      <span
        className={cn(
          'text-12px ',
          selectedKey === tagKey
            ? 'color-[var(--main)] font-bold'
            : 'color-[var(--item-tag-text-color)]'
        )}>
        {tagName}
      </span>
    </li>
  )
}
