/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { createSelector } from "@reduxjs/toolkit"
import { DataMigrationPercentageProgress } from "../data-migration/perform-data.migration"
import { selectDataTransferProgress } from "./data-transfer-progress"

export const selectDataMigrationProgress = createSelector(
  selectDataTransferProgress,
  (state: ReduxRootState) => state.dataMigration.transferProgress,
  (
    { currentDomain: label, progress: dataTransferProgress = 0 },
    dataMigrationProgress = 0
  ) => {
    // Calculate overall progress as a weighted sum of data migration and data transfer progress
    const dataTransferProgressFactor =
      (100 - DataMigrationPercentageProgress.TransferringData - 1) / 100
    const value = Math.floor(
      dataMigrationProgress + dataTransferProgressFactor * dataTransferProgress
    )

    return {
      value,
      label,
    }
  }
)
