import React, { ChangeEvent, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import InputRadioGroup from "Renderer/components/core/input-radio-group/input-radio-group.component"
import { InputProps } from "Renderer/interfaces/input.interface"
import { noop } from "Renderer/utils/noop"

interface Props {
  radioButtonsData: InputProps[]
  radioGroupName: string
  onRadioValueChange?: (radioValue?: string) => void
}

const AudioConversionRadioGroup: FunctionComponent<Props> = ({
  onRadioValueChange = noop,
  radioButtonsData,
  radioGroupName,
  className,
}) => {
  const [radioValue, setRadioValue] = useState()
  const changeRadioValue = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value)
    onRadioValueChange(radioValue)
  }
  return (
    <InputRadioGroup
      className={className}
      data={radioButtonsData}
      radioGroupName={radioGroupName}
      onRadioChange={changeRadioValue}
    />
  )
}

export default AudioConversionRadioGroup
