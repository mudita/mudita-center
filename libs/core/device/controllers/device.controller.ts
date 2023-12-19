/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { ResultObject } from "Core/core/builder"
import { DeviceService } from "Core/device/services"
import { PhoneLockTime } from "Core/device/dto"
import { IpcDeviceEvent } from "Core/device/constants"

export class DeviceController {
  constructor(private deviceService: DeviceService) {}

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
