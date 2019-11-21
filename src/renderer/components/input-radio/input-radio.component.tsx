import * as React from "react"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Input = styled.input`
  appearance: none;
  display: inline-block;
  width: 2em;
  height: 2em;
  padding: 4px;
  background-clip: content-box;
  border: 2px solid #bbbbbb;
  background-color: ${backgroundColor("light")};
  border-radius: 50%;

  &:checked {
    background-color: ${backgroundColor("dark")};
  }
`

const InputRadio: FunctionComponent = () => {
  return <Input type="radio" id="huey" name="drone" value="huey" />
}

export default InputRadio
