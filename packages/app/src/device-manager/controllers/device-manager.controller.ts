/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "App/core/decorators"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { DeviceManager } from "App/device-manager/services"
import { IpcDeviceManagerEvent } from "App/device-manager/constants"


export class DeviceManagerController {
  constructor(private deviceManager: DeviceManager) {}

  @IpcEvent(IpcDeviceManagerEvent.GetCurrentDevice)
  public getCurrentDevice() {
    try {
      return Result.success(this.deviceManager.device.toSerializableObject())
    } catch (error) {
      return Result.failed(error as AppError)
    }
  }
}
