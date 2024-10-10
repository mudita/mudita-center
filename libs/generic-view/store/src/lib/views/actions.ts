/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { View } from "generic-view/utils"
import { DeviceState } from "device-manager/models"
import { DeviceBaseProperties } from "device-protocol/models"
import { MenuElement } from "Core/__deprecated__/renderer/constants/menu-elements"
import { ActionName } from "../action-names"
import { GenericForm } from "generic-view/models"

export const addDevice = createAction<
  DeviceBaseProperties & Partial<{ state: DeviceState.Failed }>
>(ActionName.AddDevice)

export const removeDevice = createAction<DeviceBaseProperties>(
  ActionName.RemoveDevice
)

export const setMenu = createAction<MenuElement[]>(ActionName.SetMenu)

export const setLastRefresh = createAction<number>(ActionName.SetLastRefresh)

export const setDeviceState = createAction<{ id: string; state: DeviceState }>(
  ActionName.SetDeviceState
)

export const registerForm = createAction<{
  formName: string
  form: GenericForm
  feature: string
  deviceId: string
}>(ActionName.RegisterForm)

export const setFormField = createAction<{
  formName: string
  field: string
  value: unknown
  feature: string
  deviceId: string
}>(ActionName.SetFormField)

export const setGenericConfig = createAction<{
  config: View
  feature: string
  deviceId: string
}>(ActionName.SetGenericConfig)
