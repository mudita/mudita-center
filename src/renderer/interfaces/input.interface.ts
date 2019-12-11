import { InputHTMLAttributes } from "react"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  labelDisplayStyle?: TextDisplayStyle
  indeterminate?: boolean
}
