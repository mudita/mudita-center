/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceId } from "Core/device/constants/device-id"
import { createReducer } from "@reduxjs/toolkit"
import { registerForm, resetForm, setFormField } from "./actions"

type FormName = string
export const appForms = "app"
export type Fields = Record<string, unknown>

export interface Form {
  fields: Fields
  defaultFields?: Fields
}

type FormState = Record<typeof appForms | DeviceId, Record<FormName, Form>>

const initialState: FormState = {
  app: {},
}

export const formsReducer = createReducer(initialState, (builder) => {
  builder.addCase(registerForm, (state, action) => {
    const { formName, form, deviceId } = action.payload
    if (deviceId && deviceId !== appForms) {
      state[deviceId] = {
        ...state[deviceId],
        [formName]: form,
      }
    } else {
      state.app = {
        ...state.app,
        [formName]: form,
      }
    }
  })
  builder.addCase(setFormField, (state, action) => {
    const { formName, field, value, deviceId } = action.payload
    if (deviceId && deviceId !== appForms) {
      state[deviceId][formName].fields[field] = value
    } else {
      state.app[formName].fields[field] = value
    }
  })
  builder.addCase(resetForm, (state, action) => {
    const { formName, deviceId } = action.payload
    const defaultValues = state[deviceId ?? "app"][formName].defaultFields

    if (!defaultValues) return
    if (deviceId && deviceId !== appForms) {
      state[deviceId][formName].fields = defaultValues
    } else {
      state.app[formName].fields = defaultValues
    }
  })
})
