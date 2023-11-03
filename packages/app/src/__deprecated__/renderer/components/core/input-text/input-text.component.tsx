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
} from "App/__deprecated__/renderer/components/core/input-text/input-text.interface"

const isTextareaProps = (
  props: InputComponentProps
): props is TextareaProps => {
  return props.type === "textarea"
}

const isInputPasscodeProps = (
  props: InputComponentProps
): props is InputPasscodeProps => {
  return props.type === "passcode"
}

const ForwardedInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputComponentProps
>((props) => {
  if (isTextareaProps(props)) {
    return <TextArea {...props} />
  } else if (isInputPasscodeProps(props)) {
    return <InputPasscode {...props} />
  }
  return <InputText {...props} />
})

export default ForwardedInput
