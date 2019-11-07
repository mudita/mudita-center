import * as React from "react"
import styled from "styled-components"
import FunctionComponent from "../types/function-component.interface"

const AppWrapper = styled.div``

const AppContainer: FunctionComponent = ({ children }) => {
  return <AppWrapper>{children}</AppWrapper>
}

export default AppContainer
