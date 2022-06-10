/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
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
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"

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

export const InputComponent: FunctionComponent<InputComponentProps> = (
  props
) => {
  if (isTextareaProps(props)) {
    return <TextArea {...props} />
  } else if (isInputPasscodeProps(props)) {
    return <InputPasscode {...props} />
  } else if (props.type !== undefined) {
    return <InputText {...props} />
  } else {
    return <InputText {...props} type={"text"} />
  }
}

export default React.forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  ComponentProps<typeof InputComponent>
>((props, ref) => <InputComponent {...props} inputRef={ref} />)
