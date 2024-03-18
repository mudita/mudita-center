/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"

import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const backupProgress = createSelector(
  [(state: ReduxRootState) => state.genericBackups.backupProcess],
  (backupProcess) => {
    if (!backupProcess) {
      return { progress: 0 }
    }

    if (backupProcess.status === "DONE") {
      return { progress: 100 }
    }

    const features = Object.values(backupProcess.featureFilesTransfer)
    const downloadedFilesCount = features.filter(
      (item) => item.status === "DONE"
    ).length

    if (features.length <= downloadedFilesCount) {
      return { progress: 90 }
    }

    const [featureInProgress] =
      Object.entries(backupProcess.featureFilesTransfer).find(
        ([, item]) => item.status === "IN_PROGRESS"
      ) ?? []

    return {
      progress: Math.floor(10 + (downloadedFilesCount / features.length) * 80),
      featureInProgress,
    }
  }
)
