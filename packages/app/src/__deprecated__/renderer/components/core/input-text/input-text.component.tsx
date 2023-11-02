/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import {
  InputText,
  TextArea,
  InputPasscode,
} from "App/__deprecated__/renderer/components/core/input-text/input-text.elements"
import {
  InputComponentProps,
  InputPasscodeProps,
  TextareaProps,
  InputProps,
} from "App/__deprecated__/renderer/components/core/input-text/input-text.interface"

const isTextareaProps = (
  props: InputComponentProps
): props is TextareaProps => {
  return props.type === "textarea"
}

const isInputProps = (props: InputComponentProps): props is InputProps => {
  return true
}

const isInputPasscodeProps = (
  props: InputComponentProps
): props is InputPasscodeProps => {
  return props.type === "passcode"
}
const isTextareaRef = (
  ref: React.ForwardedRef<any>
): ref is React.ForwardedRef<HTMLTextAreaElement> => {
  return true
}
const isInputRef = (
  ref: React.ForwardedRef<any>
): ref is React.ForwardedRef<HTMLInputElement> => {
  return true
}

const ForwardedInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputComponentProps
>((props, ref) => {
  if (isTextareaProps(props) && isTextareaRef(ref)) {
    return <TextArea {...props} inputRef={ref} />
  } else if (isInputPasscodeProps(props) && isInputRef(ref)) {
    return <InputPasscode {...props} inputRef={ref} />
  } else if (isInputProps(props) && isInputRef(ref)) {
    return <InputText {...props} inputRef={ref} />
  }
  return null
})

export default ForwardedInput
