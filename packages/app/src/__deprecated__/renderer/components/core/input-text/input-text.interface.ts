/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
} from "react"

type Icons = ReactNode[]

export interface InputIconsProps {
  leadingIcons?: Icons
  trailingIcons?: Icons
}

interface BasicProps extends InputIconsProps {
  label?: string
  disabled?: boolean
  outlined?: boolean
  errorMessage?: string | ReactElement
  focusable?: boolean
  defaultHeight?: string
}

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    BasicProps {
  condensed?: boolean
  inputRef?: Ref<HTMLInputElement>
  type: "text" | "email" | "password" | "search" | "tel" | "url"
  initialTransparentBorder?: boolean
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    BasicProps {
  maxRows?: number
  inputRef?: Ref<HTMLTextAreaElement>
  type: "textarea"
}
export interface InputPasscodeProps
  extends TextareaHTMLAttributes<HTMLInputElement>,
    BasicProps {
  type: "passcode"
  inputRef?: Ref<HTMLInputElement>
  error?: boolean
  filled?: boolean
}

export type InputComponentProps =
  | InputProps
  | TextareaProps
  | InputPasscodeProps
