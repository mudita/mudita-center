import * as React from "react"
import Text, { TextDisplayStyle } from "Renderer/components/text/text.component"
import { InputProps } from "Renderer/interfaces/input.interface"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Input = styled.input`
  appearance: none;
  display: inline-block;
  outline: none;
  width: 2em;
  height: 2em;
  padding: 3px;
  background-clip: content-box;
  border: 1px solid ${borderColor("default")};
  background-color: ${backgroundColor("light")};
  border-radius: 50%;

  &:hover {
    border-color: ${borderColor("hover")};
    cursor: pointer;
    transition: border-color 0.5s linear;
  }

  &:checked {
    background-color: ${backgroundColor("dark")};
  }
`

const InputRadio: FunctionComponent<InputProps> = ({
  labelDisplayStyle = TextDisplayStyle.Default,
  className,
  ...props
}) => {
  return (
    <Text displayStyle={labelDisplayStyle} className={className}>
      <Input {...props} type="radio" />
    </Text>
  )
}

export default InputRadio
