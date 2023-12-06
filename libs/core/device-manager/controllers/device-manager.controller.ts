/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { DeviceManager } from "Core/device-manager/services"
import { IpcDeviceManagerEvent } from "Core/device-manager/constants"

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
