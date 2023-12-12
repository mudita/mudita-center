/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { InputHTMLAttributes, Ref } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  subLabel?: string
  indeterminate?: boolean
  inputRef?: Ref<HTMLInputElement>
}
