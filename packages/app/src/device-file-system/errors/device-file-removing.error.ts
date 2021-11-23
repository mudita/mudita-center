/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceFileSystemError } from "App/device-file-system/constants"

export class DeviceFileRemovingError extends Error {
  public type = DeviceFileSystemError.Removing

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DeviceFileRemovingError)
    }
  }
}
