/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ConfiguredDevice } from "generic-view/models"
import { selectDevices } from "./select-devices"
import { DeviceState } from "device-manager/models"

export const selectIdentifiedDevices = createSelector(
  selectDevices,
  (devices): Record<string, ConfiguredDevice> => {
    const filteredDevices = Object.fromEntries(
      Object.entries(devices).filter(
        ([_, data]) => data.state === DeviceState.Identified
      )
    )

    return filteredDevices as Record<string, ConfiguredDevice>
  }
)
