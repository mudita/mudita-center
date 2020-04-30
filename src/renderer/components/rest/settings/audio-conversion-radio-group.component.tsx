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
  radioButtonsData,
  ...props
}) => {
  return <InputRadioGroup {...props} data={radioButtonsData} />
}

export default AudioConversionRadioGroup
