import { InputHTMLAttributes } from "react"

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  subLabel?: string
}
