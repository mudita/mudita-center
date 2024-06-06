/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocolService } from "device-protocol/feature"
import { Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { GeneralError, DeviceSystemActionsServiceEvents } from "device/models"
import { IpcEvent } from "Core/core/decorators"

export class DeviceSystemActionsService {
  constructor(private deviceManager: DeviceProtocolService) {}

  private async sendSystemRequest(
    action: string,
    { deviceId }: { deviceId?: string } = {}
  ) {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "SYSTEM",
      method: "POST",
      body: {
        action,
      },
    })

    if (response.ok) {
      return Result.success(undefined)
    }

    return Result.failed(response.error)
  }

  @IpcEvent(DeviceSystemActionsServiceEvents.Reboot)
  public reboot({ deviceId }: { deviceId?: string } = {}) {
    return this.sendSystemRequest("reboot", { deviceId })
  }

  @IpcEvent(DeviceSystemActionsServiceEvents.Lock)
  public lock({ deviceId }: { deviceId?: string } = {}) {
    return this.sendSystemRequest("lock", { deviceId })
  }

  @IpcEvent(DeviceSystemActionsServiceEvents.PowerOff)
  public powerOff({ deviceId }: { deviceId?: string } = {}) {
    return this.sendSystemRequest("powerOff", { deviceId })
  }
}
