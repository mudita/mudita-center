import { InputHTMLAttributes } from "react"
import { TextDisplayStyle } from "Renderer/components/text/text.component"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelDisplayStyle?: TextDisplayStyle
}
