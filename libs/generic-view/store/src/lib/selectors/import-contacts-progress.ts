/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { importStatusSelector } from "./import-status-selector"
import { selectDataTransferProgress } from "./data-transfer-progress"

const transferStartedProgress = 10

export const importContactsProgress = createSelector(
  selectDataTransferProgress,
  importStatusSelector,
  ({ progress: dataTransferProgress = 0 }, importProgress) => {
    let progress = 0

    if (!importProgress) {
      return { progress }
    }

    switch (importProgress) {
      case "IMPORT-INTO-DEVICE-IN-PROGRESS":
        progress = transferStartedProgress
        break
      case "IMPORT-DEVICE-DATA-TRANSFER":
        progress = 100
        break
      default: {
        const dataTransferProgressFactor =
          (100 - transferStartedProgress - 1) / 100
        progress = Math.floor(
          transferStartedProgress +
            dataTransferProgressFactor * dataTransferProgress
        )
      }
    }

    return { progress }
  }
)
