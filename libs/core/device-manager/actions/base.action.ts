/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { DeviceBaseProperty } from "Core/device-manager/reducers/device-manager.interface"
import { DeviceManagerEvent } from "Core/device-manager/constants"

export const addDevice = createAction<DeviceBaseProperty>(
  DeviceManagerEvent.AddDevice
)
