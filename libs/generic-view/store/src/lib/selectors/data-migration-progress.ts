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
    { currentDomain, progress: dataTransferProgress = 0 },
    dataMigrationProgress = 0
  ) => {
    const maxManualProgress = DataMigrationPercentageProgress.TransferringData
    const dataTransferProgressFactor = (100 - maxManualProgress - 1) / 100

    return {
      value: Math.floor(
        dataMigrationProgress +
          dataTransferProgressFactor * dataTransferProgress
      ),
      label: currentDomain?.split("-")[0],
    }
  }
)
