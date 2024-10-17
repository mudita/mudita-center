/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { deviceManagerState } from "device-manager/feature"
import { selectTimeSynchronizationStatus } from "Core/time-synchronization/selectors/time-synchronization-status.selector"

export const isSelectDeviceDrawerOpenSelector = createSelector(
  deviceManagerState,
  selectTimeSynchronizationStatus,
  ({ selectDeviceDrawerOpen }, timeSyncStatus): boolean => {
    return selectDeviceDrawerOpen && timeSyncStatus === "idle"
  }
)
