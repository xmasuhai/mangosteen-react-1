import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const BorderedDiv = styled.div`
  color: darkblue;
  border: 1px solid darkred;

  &:hover {
    background-color: yellow;
  }
`

export const Welcome2: React.FC = () => {
  return (
    <BorderedDiv>
      welcome 2
      <NavLink to="/welcome/3">下一页</NavLink>
    </BorderedDiv>
  )
}
