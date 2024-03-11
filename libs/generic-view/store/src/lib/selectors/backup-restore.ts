/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"

import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const selectBackupRestore = createSelector(
  [(state: ReduxRootState) => state.genericBackups.restoreProcess],
  (restoreProcess) => {
    return restoreProcess
  }
)

export const selectBackupRestoreStatus = createSelector(
  selectBackupRestore,
  (restoreProcess) => {
    return restoreProcess?.status
  }
)

export const selectBackupRestorePassword = createSelector(
  selectBackupRestore,
  (restoreProcess) => {
    return restoreProcess?.metadata?.header.password
  }
)
