import React, { ChangeEvent } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import InputRadioGroup from "Renderer/components/core/input-radio-group/input-radio-group.component"
import { InputProps } from "Renderer/interfaces/input.interface"
import { noop } from "Renderer/utils/noop"

interface Props {
  radioValue?: string
  radioButtonsData: InputProps[]
  radioGroupName: string
  changeValue: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeValue?: (radioValue?: string) => void
}

const AudioConversionRadioGroup: FunctionComponent<Props> = ({
  changeValue,
  onChangeValue = noop,
  radioButtonsData,
  radioGroupName,
  radioValue,
  className,
}) => {
  const changeRadioValue = (event: ChangeEvent<HTMLInputElement>) => {
    changeValue(event)
    onChangeValue(radioValue)
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
