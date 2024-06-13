/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ConfiguredDevice, DeviceState } from "generic-view/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectDevices } from "./select-devices"

export const selectConfiguredDevices = createSelector(
  selectDevices,
  (devices): Record<string, ConfiguredDevice> => {
    const filteredDevices = Object.fromEntries(
      Object.entries(devices).filter(
        ([_, data]) => data.state === DeviceState.Configured
      )
    )

    return filteredDevices as Record<string, ConfiguredDevice>
  }
)

export const selectConfiguredDevice = createSelector(
  selectConfiguredDevices,
  (_state: ReduxRootState, id: string) => id,
  (configuredDevices, id): ConfiguredDevice | undefined => configuredDevices[id]
)
