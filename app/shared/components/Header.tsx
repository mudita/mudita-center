import * as React from "react"
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  flex: 1;
  border: 1px #ccc dotted;
  padding: 10px;
  flex-direction: row;
`

const Header = () => {
  return (
    <HeaderWrapper> Header </HeaderWrapper>
  )
}

export default Header