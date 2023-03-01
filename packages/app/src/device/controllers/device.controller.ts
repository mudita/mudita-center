/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ResultObject } from "App/core/builder"
import { DeviceService } from "App/device/services"
import { PhoneLockTime } from "App/device/dto"
import { ControllerPrefix, IpcDeviceEvent } from "App/device/constants"
import { DeviceInfo } from "App/device/types/mudita-os"

@Controller(ControllerPrefix)
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @IpcEvent(IpcDeviceEvent.Connect)
  public async connectDevice(): Promise<ResultObject<DeviceInfo>> {
    return this.deviceService.connect()
  }

  @IpcEvent(IpcDeviceEvent.Disconnect)
  public async disconnectDevice(): Promise<ResultObject<boolean>> {
    return this.deviceService.disconnect()
  }

  @IpcEvent(IpcDeviceEvent.Unlock)
  public async unlockDevice(code: string): Promise<ResultObject<boolean>> {
    return this.deviceService.unlock(code)
  }

  @IpcEvent(IpcDeviceEvent.UnlockStatus)
  public async unlockDeviceStatus(): Promise<ResultObject<unknown>> {
    return this.deviceService.unlockStatus()
  }

  @IpcEvent(IpcDeviceEvent.LockTime)
  public async deviceLockTime(): Promise<ResultObject<PhoneLockTime>> {
    return this.deviceService.unlockTime()
  }

  @IpcEvent(IpcDeviceEvent.SetUpdating)
  public setUpdating(updating: boolean): void {
    return this.deviceService.setUpdating(updating)
  }
}
