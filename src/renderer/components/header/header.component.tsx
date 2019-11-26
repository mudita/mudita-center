import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const HeaderWrapper = styled.div`
  flex: 1;
  border: 1px #ccc dotted;
  padding: 10px;
  flex-direction: row;
`

const Header: FunctionComponent = () => {
  return <HeaderWrapper>Header</HeaderWrapper>
}

export default Header
