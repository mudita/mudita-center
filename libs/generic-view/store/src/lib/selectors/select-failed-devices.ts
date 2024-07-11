/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { Device } from "generic-view/models"
import { DeviceState } from "device-manager/models"
import { selectDevices } from "./select-devices"

export const selectFailedDevices = createSelector(
  selectDevices,
  (devices): Record<string, Device> => {
    return Object.fromEntries(
      Object.entries(devices).filter(
        ([_, data]) => data.state === DeviceState.Failed
      )
    )
  }
)
