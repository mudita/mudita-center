/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { selectDataTransferProgress } from "./data-transfer-progress"
import { selectDataMigrationStatus } from "./data-migration-status"
import { DataMigrationStatus } from "../data-migration/reducer"

export const selectDataMigrationProgress = createSelector(
  selectDataTransferProgress,
  selectDataMigrationStatus,
  (
    { currentDomain: label, progress: dataTransferProgress = 0 },
    dataMigrationStatus
  ) => {
    if (dataMigrationStatus === DataMigrationStatus.Idle) {
      return {
        value: 0,
      }
    }
    if (dataMigrationStatus === DataMigrationStatus.PureDatabaseCreating) {
      return {
        value: 5,
      }
    }
    if (dataMigrationStatus === DataMigrationStatus.PureDatabaseIndexing) {
      return {
        value: 30,
      }
    }

    if (dataMigrationStatus === DataMigrationStatus.DataTransferring) {
      // Calculate overall progress as a weighted sum of data migration and data transfer progress
      const dataTransferProgressFactor = (70 - 1) / 100
      const value = Math.floor(
        30 + dataTransferProgressFactor * dataTransferProgress
      )

      return {
        value,
        label,
      }
    }

    return {
      value: 100,
    }
  }
)
