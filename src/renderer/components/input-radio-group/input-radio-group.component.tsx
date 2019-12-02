import * as React from "react"
import { InputProps } from "Renderer/interfaces/input.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import InputRadio from "../input-radio/input-radio.component"

const InputRadioGroup: FunctionComponent<{ data: InputProps[] }> = ({
  data,
}) => {
  const inputs = data.map((el, index) => <InputRadio {...el} key={index} />)
  return <div>{inputs}</div>
}

export default InputRadioGroup
