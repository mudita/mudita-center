import * as React from "react"
import Text, { TextDisplayStyle } from "Renderer/components/text/text.component"
import { InputProps } from "Renderer/interfaces/input.interface"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import check from "Renderer/svg/check-icon.svg"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Label = styled.label`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  appearance: none;
  outline: none;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  background-clip: content-box;
  border: 0.1rem solid ${borderColor("default")};
  border-radius: 0.2rem;
  background-color: ${backgroundColor("light")};

  &:after {
    content: "";
    display: block;
    height: 2rem;
    width: auto;
    background-image: url(${check});
    background-repeat: no-repeat;
    background-position: center;
  }

  &:hover {
    border-color: ${borderColor("hover")};
    cursor: pointer;
    transition: border-color 0.5s linear;
  }

  &:checked {
    background-color: ${backgroundColor("inputDark")};
    border-color: ${borderColor("hover")};
  }
`

const LabelText = styled(Text)`
  margin-left: 1.3rem;
`

const InputCheckbox: FunctionComponent<InputProps> = ({
  className,
  label,
  ...props
}) => {
  return (
    <Label>
      <Input {...props} type="checkbox" />
      <LabelText
        displayStyle={TextDisplayStyle.MediumText}
        className={className}
        element={"span"}
      >
        {label}
      </LabelText>
    </Label>
  )
}

export default InputCheckbox
