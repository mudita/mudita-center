import * as React from "react"
import { InputProps } from "Renderer/interfaces/input.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import InputRadio from "../input-radio/input-radio.component"

const InputRadioGroup: FunctionComponent<{
  data: InputProps[]
  radioGroupName: string
}> = ({ data, radioGroupName }) => {
  const inputs = data.map((el, index) => (
    <InputRadio {...el} name={radioGroupName} key={index} />
  ))
  return <div>{inputs}</div>
}

export default InputRadioGroup
