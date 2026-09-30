import { useLocation, useOutlet } from 'react-router-dom'

export const WelcomeMainLayout: React.FC = () => {
  const location = useLocation()
  const currentOutlet = useOutlet()

  window.console.log('_______________________')
  window.console.log('✌️location --->', location)
  window.console.log('✌️currentOutlet --->', currentOutlet)
  window.console.log('_______________________')

  return (
    <div>
      {currentOutlet}
    </div>
  )
}
