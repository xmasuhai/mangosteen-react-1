import logo from '@/assets/icons/mangosteen.svg'

export const MangosteenHeader: React.FC = () => (
  <header shrink-0 text-center pt-4em>
    <img alt="logo" src={logo} w-64px h-69px inline />
    <h1 text="var(--title-text)" text-2em>山竹记账</h1>
  </header>
)
