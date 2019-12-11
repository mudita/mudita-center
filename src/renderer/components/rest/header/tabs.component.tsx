import * as React from "react"
import { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const TabsWrapper = styled.div`
  display: flex;
`

const Tabs: FunctionComponent = ({ children, className }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <TabsWrapper className={className}>
      {React.Children.map(children, (element, index) => {
        return React.cloneElement(element as React.ReactElement, {
          active: activeIndex === index,
          onClick: () => setActiveIndex(index),
        })
      })}
    </TabsWrapper>
  )
}

export default Tabs
