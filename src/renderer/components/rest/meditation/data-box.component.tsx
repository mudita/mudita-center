import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  DataWrapper,
  TextBox,
} from "Renderer/components/rest/meditation/data-box.styled"

const DataBox: FunctionComponent = ({ children }) => (
  <DataWrapper>
    <TextBox>{children}</TextBox>
  </DataWrapper>
)

export default DataBox
