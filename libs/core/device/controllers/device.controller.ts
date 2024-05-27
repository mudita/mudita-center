/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { ResultObject } from "Core/core/builder"
import { DeviceService } from "Core/device/services"
import { PhoneLockTime } from "Core/device/dto"
import { IpcDeviceEvent } from "Core/device/constants"
import { DeviceId } from "Core/device/constants/device-id"

export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @IpcEvent(IpcDeviceEvent.Unlock)
  public async unlockDevice({
    code,
    deviceId,
  }: {
    code: string
    deviceId?: DeviceId
  }): Promise<ResultObject<boolean>> {
    return this.deviceService.unlock(code, deviceId)
  }

  @IpcEvent(IpcDeviceEvent.UnlockStatus)
  public async unlockDeviceStatus(
    deviceId?: DeviceId
  ): Promise<ResultObject<unknown>> {
    return this.deviceService.unlockStatus(deviceId)
  }

  @IpcEvent(IpcDeviceEvent.LockTime)
  public async deviceLockTime(
    deviceId?: DeviceId
  ): Promise<ResultObject<PhoneLockTime>> {
    return this.deviceService.unlockTime(deviceId)
  }
}
