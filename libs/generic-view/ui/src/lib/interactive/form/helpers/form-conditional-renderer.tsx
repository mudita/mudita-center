/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import { FormConditionalRendererConfig } from "generic-view/models"
import { useFormContext } from "react-hook-form"

export const FormConditionalRenderer: APIFC<
  undefined,
  FormConditionalRendererConfig
> = ({ children, config }) => {
  const formContext = useFormContext()
  const value = Boolean(formContext.watch(config.formFieldName))
  const shouldRender = config.renderIfFalse ? !value : value

  return shouldRender ? <>{children}</> : null
}
