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

export const selectBackupRestoreProgress = createSelector(
  selectBackupRestore,
  (restoreProcess) => {
    if (!restoreProcess) {
      return { progress: 0 }
    }

    if (restoreProcess.status === "DONE") {
      return { progress: 100 }
    }

    const features = Object.values(restoreProcess.featureFilesTransfer ?? [])
    const downloadedFilesCount = features.filter(
      (item) => item.status === "DONE"
    ).length

    if (features.length <= downloadedFilesCount) {
      return { progress: 90 }
    }

    const [featureInProgress] =
      Object.entries(restoreProcess.featureFilesTransfer ?? []).find(
        ([, item]) => item.status === "IN_PROGRESS"
      ) ?? []

    return {
      progress: Math.floor(10 + (downloadedFilesCount / features.length) * 80),
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
