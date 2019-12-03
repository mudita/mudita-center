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
  padding: 0.3rem;
  background-clip: content-box;
  border: 0.1rem solid ${borderColor("default")};
  background-color: ${backgroundColor("light")};
  border-radius: 50%;
  margin-right: 1.2rem;

  &:hover {
    border-color: ${borderColor("hover")};
    cursor: pointer;
    transition: border-color 0.5s linear;
  }

  &:checked {
    background-color: ${backgroundColor("dark")};
  }
`

const Label = styled.label`
  display: flex;
  align-items: center;
`

const SubLabel = styled(Text)`
  margin-left: 3.5rem;
`

const LabelWrapper = styled.div`
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`

const InputRadio: FunctionComponent<InputProps> = ({
  className,
  children,
  label,
  subLabel,
  ...props
}) => {
  return (
    <LabelWrapper>
      <Label className={className}>
        <Input {...props} type="radio" className={className} />
        <Text displayStyle={TextDisplayStyle.MediumBoldText} element={"span"}>
          {label}
        </Text>
      </Label>
      <SubLabel displayStyle={TextDisplayStyle.MediumFadedLightText}>
        {subLabel}
      </SubLabel>
    </LabelWrapper>
  )
}

export default InputRadio
