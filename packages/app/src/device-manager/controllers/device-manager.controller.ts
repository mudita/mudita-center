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
import { Device } from "App/device/modules/device"

@Controller(ControllerPrefix)
export class DeviceManagerController {
  constructor(private deviceManager: DeviceManager) {}

  @IpcEvent(IpcDeviceManagerEvent.GetCurrentDevice)
  public getCurrentDevice(): ResultObject<Device> {
    try {
      return Result.success(this.deviceManager.device)
    } catch (error) {
      return Result.failed(error as AppError)
    }
  }

  @IpcEvent(IpcDeviceManagerEvent.GetDevices)
  public getDevices(): ResultObject<Device[]> {
    return Result.success(this.deviceManager.devices)
  }

  @IpcEvent(IpcDeviceManagerEvent.SetCurrentDevice)
  public setCurrentDevice(path: string): ResultObject<boolean> {
    return this.deviceManager.setCurrentDevice(path)
  }
}
