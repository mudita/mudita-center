/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { selectActiveDevice } from "./active-device"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const selectDeviceBackups = createSelector(
  selectActiveDevice,
  (state: ReduxRootState) => state.genericBackups.backups,
  (activeDevice, backups) => {
    return backups
      .filter((backup) => backup.serialNumber === activeDevice)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
  }
)

export const selectLastBackup = createSelector(
  selectDeviceBackups,
  (backups) => backups[0]
)
