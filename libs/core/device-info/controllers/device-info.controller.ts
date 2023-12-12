/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { ResultObject } from "Core/core/builder"
import { DeviceInfo } from "Core/device-info/dto"
import { DeviceInfoService } from "Core/device-info/services"
import { IpcDeviceInfoEvent } from "Core/device-info/constants"

export class DeviceInfoController {
  constructor(private deviceInfoService: DeviceInfoService) {}

  @IpcEvent(IpcDeviceInfoEvent.GetDeviceInfo)
  public async getDeviceInfo(): Promise<ResultObject<DeviceInfo>> {
    return this.deviceInfoService.getDeviceInfo()
  }
}
