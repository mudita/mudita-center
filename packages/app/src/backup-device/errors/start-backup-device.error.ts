/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BackupDeviceError } from "App/backup-device/constants"

export class StartBackupDeviceError extends Error {
  public type = BackupDeviceError.StartBackupDevice

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, StartBackupDeviceError)
    }
  }
}
