/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  BackupProcessFileStatus,
  RestoreProcessStatus,
} from "../backup/backup.types"

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

export const selectBackupRestoreProgress = createSelector(
  selectBackupRestore,
  (restoreProcess) => {
    if (!restoreProcess) {
      return { progress: 0 }
    }

    if (restoreProcess.status === RestoreProcessStatus.Done) {
      return { progress: 100 }
    }

    const [featureInProgress] =
      Object.entries(restoreProcess.featureFilesTransfer ?? []).find(
        ([, item]) => item.status === BackupProcessFileStatus.InProgress
      ) ?? []

    return {
      progress: Math.round(restoreProcess.progress ?? 0),
      featureInProgress,
    }
  }
)

export const selectBackupRestorePassword = createSelector(
  selectBackupRestore,
  (restoreProcess) => {
    return restoreProcess?.metadata?.header.password
  }
)
