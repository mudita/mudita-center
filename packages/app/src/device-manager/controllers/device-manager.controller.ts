/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ResultObject, Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { DeviceManager } from "App/device-manager/services"
import {
  ControllerPrefix,
  IpcDeviceManagerEvent,
} from "App/device-manager/constants"

@Controller(ControllerPrefix)
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

  @IpcEvent(IpcDeviceManagerEvent.GetDevices)
  public getDevices() {
    return Result.success(
      this.deviceManager.devices.map((item) => item.toSerializableObject())
    )
  }

  @IpcEvent(IpcDeviceManagerEvent.SetCurrentDevice)
  public setCurrentDevice(path: string): ResultObject<boolean> {
    return this.deviceManager.setCurrentDevice(path)
  }
}
