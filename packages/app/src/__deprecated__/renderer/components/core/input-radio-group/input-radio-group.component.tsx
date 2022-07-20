/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { InputProps } from "App/__deprecated__/renderer/interfaces/input.interface"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import styled from "styled-components"
import InputRadio from "../input-radio/input-radio.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { ChangeEvent } from "react"

const InputGroup = styled.div`
  display: flex;
  &:not(:last-child) {
    margin-bottom: 0.8rem;
  }
`

const Input = styled(InputRadio)`
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`

const InputRadioGroup: FunctionComponent<{
  data: InputProps[]
  radioGroupName: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
}> = ({ value, data, radioGroupName, className, onChange = noop }) => {
  const inputs = data.map((inputProps, index) => (
    <Input
      {...inputProps}
      id={`${radioGroupName}${index}`}
      name={radioGroupName}
      key={index}
      label={inputProps.label}
      subLabel={inputProps.subLabel}
      onChange={onChange}
      checked={value === inputProps.value}
    />
  ))
  return <InputGroup className={className}>{inputs}</InputGroup>
}

export default InputRadioGroup
