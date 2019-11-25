import { InputHTMLAttributes } from "react"
import { TextDisplayStyle } from "Renderer/components/text/text.component"

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  labelDisplayStyle?: TextDisplayStyle
}
