/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { selectActiveApiDeviceId } from "./select-active-api-device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const selectDeviceBackups = createSelector(
  selectActiveApiDeviceId,
  (state: ReduxRootState) => state.genericBackups.backups,
  (activeDeviceId, backups) => {
    return backups
      .filter((backup) => backup.serialNumber === activeDeviceId)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
  }
)

export const selectLastBackup = createSelector(
  selectDeviceBackups,
  (backups) => backups[0]
)
