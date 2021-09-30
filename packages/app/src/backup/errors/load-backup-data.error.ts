/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { BackupError } from "App/backup/constants"

export class LoadBackupDataError extends Error {
  public type = BackupError.Load

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LoadBackupDataError)
    }
  }
}
