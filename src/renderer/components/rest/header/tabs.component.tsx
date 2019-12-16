import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const TabsWrapper = styled.div`
  display: flex;
`

const Tabs: FunctionComponent = ({ children, className }) => {
  return <TabsWrapper className={className}>{children}</TabsWrapper>
}

export default Tabs
