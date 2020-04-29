import React, { ChangeEvent } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import InputRadioGroup from "Renderer/components/core/input-radio-group/input-radio-group.component"
import { InputProps } from "Renderer/interfaces/input.interface"

interface Props {
  radioButtonsData: InputProps[]
  radioGroupName: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const AudioConversionRadioGroup: FunctionComponent<Props> = ({
  onChange,
  radioButtonsData,
  radioGroupName,
  className,
}) => {
  const changeRadioValue = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }
  return (
    <InputRadioGroup
      className={className}
      data={radioButtonsData}
      radioGroupName={radioGroupName}
      onChange={changeRadioValue}
    />
  )
}

export default AudioConversionRadioGroup
