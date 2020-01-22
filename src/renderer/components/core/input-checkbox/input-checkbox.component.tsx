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
import checkIndeterminate from "Renderer/svg/check-indeterminate.svg"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

const Label = styled.label`
  display: flex;
  align-items: center;
`

const InputWrapper = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;
`

const checkedStyles = css`
  background-color: ${backgroundColor("inputDark")};
  border-color: ${borderColor("hover")};
  + svg {
    display: initial;
  }
`

const Input = styled.input<{ indeterminate: boolean }>`
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
    ${checkedStyles};
  }
  ${({ indeterminate }) => indeterminate && checkedStyles};
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

const LabelText = styled(Text)`
  margin-left: 1.3rem;
`

const InputCheckbox: FunctionComponent<InputProps> = ({
  className,
  label,
  indeterminate = false,
  ...props
}) => {
  const checkbox = (
    <InputWrapper className={className}>
      <Input indeterminate={indeterminate} {...props} type="checkbox" />
      {indeterminate ? (
        <CheckIcon
          Image={checkIndeterminate}
          data-testid="state-indeterminate"
        />
      ) : (
        <CheckIcon Image={check} data-testid="state-checked" />
      )}
    </InputWrapper>
  )
  return (
    <>
      {label ? (
        <Label>
          {checkbox}
          <LabelText
            displayStyle={TextDisplayStyle.MediumText}
            className={className}
            element={"span"}
          >
            {label}
          </LabelText>
        </Label>
      ) : (
        checkbox
      )}
    </>
  )
}

export default InputCheckbox
