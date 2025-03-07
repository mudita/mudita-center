/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { BackupProcessFileStatus } from "../backup/backup.types"

export const backupProgress = createSelector(
  [(state: ReduxRootState) => state.genericBackups.backupProcess],
  (backupProcess) => {
    if (!backupProcess) {
      return { progress: 0 }
    }

    const [featureInProgress] =
      Object.entries(backupProcess.featureFilesTransfer).find(
        ([, item]) => item.status === BackupProcessFileStatus.InProgress
      ) ?? []

    return {
      progress: Math.round(backupProcess.progress ?? 0),
      featureInProgress,
    }
  }
)
