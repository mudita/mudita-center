import React, { ChangeEvent } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import InputRadioGroup from "Renderer/components/core/input-radio-group/input-radio-group.component"
import { InputProps } from "Renderer/interfaces/input.interface"

interface Props {
  radioButtonsData: InputProps[]
  radioGroupName: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
}

const AudioConversionRadioGroup: FunctionComponent<Props> = ({
  onChange,
  radioButtonsData,
  radioGroupName,
  className,
  value,
}) => {
  const changeRadioValue = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }
  return (
    <InputRadioGroup
      value={value}
      className={className}
      data={radioButtonsData}
      radioGroupName={radioGroupName}
      onChange={changeRadioValue}
    />
  )
}

export default AudioConversionRadioGroup
