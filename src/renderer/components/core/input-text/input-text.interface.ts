import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react"

export enum InputTextLayout {
  Standard,
  Outlined,
  TextArea,
}

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
  layout: Omit<InputTextLayout, InputTextLayout.TextArea>
  condensed?: boolean
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    BasicProps {
  maxRows?: number
}

export interface InputComponentProps
  extends Partial<InputProps & TextareaProps> {
  type?: "text" | "email" | "password" | "search" | "tel" | "url" | "textarea"
}

export type HTMLInputComponent = HTMLTextAreaElement & HTMLInputElement
