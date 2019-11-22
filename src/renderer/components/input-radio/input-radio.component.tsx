import * as React from "react"
import { InputHTMLAttributes } from "react"
import Text, { TextDisplayStyle } from "Renderer/components/text/text.component"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const RadioInputWrapper = styled.label`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const Input = styled.input`
  appearance: none;
  display: inline-block;
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

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelDisplayStyle?: TextDisplayStyle
}

const InputRadio: FunctionComponent<Readonly<RadioButtonProps>> = ({
  label,
  labelDisplayStyle = TextDisplayStyle.Default,
  ...props
}) => {
  return (
    <Text displayStyle={labelDisplayStyle}>
      <RadioInputWrapper>
        <Input type="radio" {...props} />
        {label}
      </RadioInputWrapper>
    </Text>
  )
}

export default InputRadio
