import * as React from "react"
import styled from "styled-components"

import FunctionComponent from "Renderer/types/function-component.interface"

import Navigation from "Renderer/components/navigation/navigation.component"

const SAppWrapper = styled.div``

const AppWrapper: FunctionComponent = ({ children }) => {
  return (
    <SAppWrapper>
      <Navigation />
      {children}
    </SAppWrapper>
  )
}

export default AppWrapper
