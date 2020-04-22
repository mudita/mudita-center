import * as React from "react"
import { InputProps } from "Renderer/interfaces/input.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import InputRadio from "../input-radio/input-radio.component"
import { noop } from "Renderer/utils/noop"

const InputGroup = styled.div`
  display: flex;
`

const Input = styled(InputRadio)`
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`

const InputRadioGroup: FunctionComponent<{
  data: InputProps[]
  radioGroupName: string
  onChangeRadioGroup?: () => void
}> = ({ data, radioGroupName, className, onChangeRadioGroup = noop }) => {
  const inputs = data.map((inputProps, index) => (
    <Input
      {...inputProps}
      name={radioGroupName}
      key={index}
      label={inputProps.label}
      subLabel={inputProps.subLabel}
      onChange={onChangeRadioGroup}
    />
  ))
  return <InputGroup className={className}>{inputs}</InputGroup>
}

export default InputRadioGroup
