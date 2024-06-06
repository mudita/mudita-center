/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { DeviceState, CaseColour } from "core-device/models"
import { CoreDeviceEvent } from "../constants"

export const addDevice = createAction<
  DeviceBaseProperties & Partial<{ state: DeviceState; caseColour: CaseColour }>
>(CoreDeviceEvent.AddDevice)

export const removeDevice = createAction<DeviceBaseProperties>(
  CoreDeviceEvent.RemoveDevice
)

export const setDeviceState = createAction<{ id: string; state: DeviceState }>(
  CoreDeviceEvent.SetDeviceState
)
