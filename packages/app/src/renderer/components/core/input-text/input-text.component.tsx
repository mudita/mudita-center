/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import {
  InputText,
  TextArea,
  InputPassword,
} from "Renderer/components/core/input-text/input-text.elements"
import { InputComponentProps } from "Renderer/components/core/input-text/input-text.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"

export const InputComponent: FunctionComponent<InputComponentProps> = ({
  type = "text",
  ...rest
}) => {
  let Component: FunctionComponent<ComponentProps<any>>

  if (type === "textarea") {
    Component = TextArea
  } else if (type === "password") {
    Component = InputPassword
  } else {
    Component = InputText
  }

  return <Component type={type} {...rest} />
}

export default React.forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  ComponentProps<typeof InputComponent>
>((props, ref) => <InputComponent {...props} inputRef={ref} />)
