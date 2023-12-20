/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { DeviceManager } from "Core/device-manager/services"
import { IpcDeviceManagerEvent } from "Core/device-manager/constants"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"

export class DeviceManagerController {
  constructor(private deviceManager: DeviceManager) {}

  @IpcEvent(IpcDeviceManagerEvent.SetActiveDevice)
  public setActiveDevice(id: DeviceId): ResultObject<boolean>  {
    return this.deviceManager.setActiveDevice(id)
  }
}
