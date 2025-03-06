/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { AppDeviceInfo } from "devices/common/models"

export const setConnectedDevices = createAction<AppDeviceInfo[]>(
  "devices/setConnectedDevices"
)

export const setCurrentDevice = createAction<AppDeviceInfo["path"] | null>(
  "devices/setCurrentDevice"
)
