import * as React from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { InputProps } from "Renderer/interfaces/input.interface"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"

export enum Size {
  Small,
  Medium,
  Large,
}

const getSize = (size: Size) => {
  switch (size) {
    case Size.Small:
      return css`
        height: 1.4rem;
        width: 1.4rem;
      `
    case Size.Medium:
      return css`
        height: 1.6rem;
        width: 1.6rem;
      `
    case Size.Large:
      return css`
        height: 2rem;
        width: 2rem;
      `
    default:
      return
  }
}

const Label = styled.label`
  display: flex;
  align-items: center;
`

const InputWrapper = styled.div<{ size: Size }>`
  position: relative;
  ${({ size }) => getSize(size)}
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
  height: 100%;
  width: 100%;
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

const CheckIcon = styled(Icon)<{ indeterminate?: boolean }>`
  display: block;
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

interface InputCheckboxProps extends InputProps {
  size?: Size
}

const InputCheckbox: FunctionComponent<InputCheckboxProps> = ({
  className,
  label,
  indeterminate = false,
  size = Size.Large,
  ...props
}) => {
  const checkbox = (
    <InputWrapper
      className={className}
      size={size}
      data-testid="checkbox-wrapper"
    >
      <Input indeterminate={indeterminate} {...props} type="checkbox" />
      {indeterminate ? (
        <CheckIcon
          type={indeterminate ? Type.CheckIndeterminate : Type.Check}
          height={1.5}
          width={0.8}
          indeterminate={indeterminate}
        />
      ) : (
        <CheckIcon type={Type.Check} width={0.8} height={1.5} />
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
