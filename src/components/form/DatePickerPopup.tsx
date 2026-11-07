interface Props {
  className?: string
}

export const DatePickerPopup: React.FC<Props> = ({ /* className, */ }) => {
  const onTouchStart = () => { }
  const onTouchMove = () => { }
  const onTouchEnd = () => { }

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="max-h-[50vh] overflow-auto">
      <ol>
        <li>2021</li>
        <li>2022</li>
        <li>2023</li>
        <li>2024</li>
        <li>2025</li>
        <li>2026</li>
        <li>2027</li>
        <li>2028</li>
        <li>2029</li>
        <li>2030</li>
        <li>2031</li>
        <li>2021</li>
        <li>2022</li>
        <li>2023</li>
        <li>2024</li>
        <li>2025</li>
        <li>2026</li>
        <li>2027</li>
        <li>2028</li>
        <li>2029</li>
        <li>2030</li>
        <li>2031</li>
      </ol>
    </div>
  )
}