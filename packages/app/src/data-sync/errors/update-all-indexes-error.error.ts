/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataSyncError } from "App/data-sync/constants"

export class UpdateAllIndexesError extends Error {
  public type = DataSyncError.UpdateAllIndexes

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UpdateAllIndexesError)
    }
  }
}
