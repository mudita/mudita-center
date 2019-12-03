import * as React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { InputProps } from "Renderer/interfaces/input.interface"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import check from "Renderer/svg/check-icon.svg"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const InputWrapper = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;
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

  &:hover {
    border-color: ${borderColor("hover")};
    cursor: pointer;
    transition: border-color 0.5s linear;
  }

  &:checked {
    background-color: ${backgroundColor("inputDark")};
    border-color: ${borderColor("hover")};
    + svg {
      display: initial;
    }
  }
`

const CheckIcon = styled(Svg)`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  user-select: none;
  path {
    stroke: ${backgroundColor("light")};
  }
`

const InputCheckbox: FunctionComponent<InputProps> = ({
  labelDisplayStyle = TextDisplayStyle.Default,
  className,
  ...props
}) => (
  <Text displayStyle={labelDisplayStyle} className={className}>
    <InputWrapper>
      <Input {...props} type="checkbox" />
      <CheckIcon Image={check} />
    </InputWrapper>
  </Text>
)

export default InputCheckbox
