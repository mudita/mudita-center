import {
  InputHTMLAttributes,
  ReactNode,
  RefObject,
  TextareaHTMLAttributes,
} from "react"

type Icons = ReactNode[]

export interface InputIconsProps {
  leadingIcons?: Icons
  trailingIcons?: Icons
}

interface BasicProps extends InputIconsProps {
  placeholder?: string
  disabled?: boolean
  outlined?: boolean
}

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    BasicProps {
  condensed?: boolean
  inputRef?: RefObject<HTMLInputElement>
  type: "text" | "email" | "password" | "search" | "tel" | "url"
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    BasicProps {
  maxRows?: number
  inputRef?: RefObject<HTMLTextAreaElement>
  type?: "textarea"
}

export type InputComponentProps = InputProps | TextareaProps
