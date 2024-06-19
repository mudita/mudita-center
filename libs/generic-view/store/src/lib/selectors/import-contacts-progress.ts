/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { importStatusSelector } from "./import-status-selector"

export const importContactsProgress = createSelector(
  [importStatusSelector],
  (importStatus) => {
    if (!importStatus) {
      return { progress: 0 }
    }

    if (importStatus === "IMPORT-INTO-DEVICE-IN-PROGRESS") {
      return { progress: 10 }
    }

    if (importStatus === "IMPORT-INTO-DEVICE-FILES-TRANSFER") {
      return { progress: 30 }
    }

    if (importStatus === "IMPORT-DEVICE-DATA-TRANSFER") {
      return { progress: 90 }
    }

    if (importStatus === "DONE") {
      return { progress: 100 }
    }

    return { progress: 0 }
  }
)
