/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceError } from "App/device/constants"

export class DeviceChangeSimError extends Error {
  public type = DeviceError.ChangeSim

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DeviceChangeSimError)
    }
  }
}
