/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { View } from "generic-view/utils"
import { DeviceState } from "generic-view/models"
import { DeviceBaseProperties } from "device-protocol/models"
import { MenuElement } from "Core/__deprecated__/renderer/constants/menu-elements"
import { ActionName } from "../action-names"

export const addDevice = createAction<
  DeviceBaseProperties & Partial<{ state: DeviceState.Failed }>
>(ActionName.AddDevice)

export const removeDevice = createAction<DeviceBaseProperties>(
  ActionName.RemoveDevice
)

export const setMenu = createAction<MenuElement[]>(ActionName.SetMenu)
export const setViewLayout = createAction<{
  feature: string
  layout: View
}>(ActionName.SetViewLayout)

export const setViewData = createAction<{
  feature: string
  data: Record<string, unknown>
}>(ActionName.SetViewData)
