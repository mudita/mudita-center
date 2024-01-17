/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { DeviceState } from "Core/device-manager/reducers/device-manager.interface"
import { CaseColor } from "Core/device"

export const addDevice = createAction<DeviceBaseProperties & Partial<{ state: DeviceState, caseColour: CaseColor }>>(
  DeviceManagerEvent.AddDevice
)

export const removeDevice = createAction<DeviceBaseProperties>(
  DeviceManagerEvent.RemoveDevice
)
