import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react"

type Icons = ReactNode[]

export interface InputIconsProps {
  leadingIcons?: Icons
  trailingIcons?: Icons
}

interface BasicProps extends InputIconsProps {
  placeholder?: string
  disabled?: boolean
}

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    BasicProps {
  condensed?: boolean
  outlined?: boolean
  type: "text" | "email" | "password" | "search" | "tel" | "url"
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    BasicProps {
  maxRows?: number
  inputLike?: boolean
  type?: "textarea"
}

export type InputComponentProps = InputProps | TextareaProps
