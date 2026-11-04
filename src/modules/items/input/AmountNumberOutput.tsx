interface Props {
  className?: string
}

export const AmountNumberOutput: React.FC<Props> = ({ /* className, */ }) => {

  return (
    <span className="text-[24px] font-mono color-[var(--amount-text-color)]">
      AmountNumberOutput
    </span>
  )
}