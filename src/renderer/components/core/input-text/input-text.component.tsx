import React, { ComponentProps } from "react"
import {
  InputText,
  TextArea,
} from "Renderer/components/core/input-text/input-text.elements"
import { InputComponentProps } from "Renderer/components/core/input-text/input-text.interface"
import FunctionComponent from "Renderer/types/function-component.interface"

export const InputComponent: FunctionComponent<InputComponentProps> = ({
  type = "text",
  ...rest
}) => {
  let Component: FunctionComponent<ComponentProps<any>>

  if (type === "textarea") {
    Component = TextArea
  } else {
    Component = InputText
  }

  return <Component type={type} {...rest} />
}

export default InputComponent
