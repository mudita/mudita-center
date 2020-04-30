import { InputHTMLAttributes, Ref } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  subLabel?: string
  indeterminate?: boolean
  inputRef?: Ref<HTMLInputElement>
}
