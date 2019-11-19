import * as React from "react"
import styled from "styled-components"

import FunctionComponent from "Renderer/types/function-component.interface"

const SAppWrapper = styled.div``

const AppWrapper: FunctionComponent = ({ children }) => {
  return <SAppWrapper>{children}</SAppWrapper>
}

export default AppWrapper
