import * as React from "react"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import styled from "styled-components"

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

interface InputRadioInterface {
  isChecked?: boolean
  isDisabled?: boolean
  id?: string
  name: string
  onChange?: () => void
  label?: string
  value?: string
}

const InputRadio: FunctionComponent<Readonly<InputRadioInterface>> = ({
  isChecked = false,
  isDisabled = false,
  id,
  name,
  onChange = () => noop,
  label,
  value,
}) => {
  return (
    <div>
      <Input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        // checked psuje
        checked={isChecked}
        disabled={isDisabled}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  )
}

export default InputRadio
