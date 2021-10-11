/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RestoreDeviceError } from "App/restore-device/constants"

export class StartRestoreDeviceError extends Error {
  public type = RestoreDeviceError.StartRestoreDevice

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, StartRestoreDeviceError)
    }
  }
}
