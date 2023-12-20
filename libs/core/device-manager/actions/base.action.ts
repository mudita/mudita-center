/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"

export const addDevice = createAction<DeviceBaseProperties>(
  DeviceManagerEvent.AddDevice
)
