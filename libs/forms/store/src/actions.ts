/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "generic-view/store"
import { Form } from "./index"

export const registerForm = createAction<{
  formName: string
  form: Form
  deviceId?: string
}>(ActionName.RegisterForm)

export const setFormField = createAction<{
  formName: string
  field: string
  value: unknown
  deviceId?: string
}>(ActionName.SetFormField)

export const resetForm = createAction<{
  formName: string
  deviceId?: string
}>(ActionName.ResetForm)
