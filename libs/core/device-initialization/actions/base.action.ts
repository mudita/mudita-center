/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { DeviceInitializationEvent } from "Core/device-initialization/constants/event.constant"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"

export const setDeviceInitializationStatus = createAction<DeviceInitializationStatus>(
  DeviceInitializationEvent.SetDeviceInitializationStatus
)
