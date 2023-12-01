/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "App/core/decorators"
import { ResultObject } from "App/core/builder"
import { DeviceInfo } from "App/device-info/dto"
import { DeviceInfoService } from "App/device-info/services"
import { IpcDeviceInfoEvent } from "App/device-info/constants"

export class DeviceInfoController {
  constructor(private deviceInfoService: DeviceInfoService) {}

  @IpcEvent(IpcDeviceInfoEvent.GetDeviceInfo)
  public async getDeviceInfo(): Promise<ResultObject<DeviceInfo>> {
    return this.deviceInfoService.getDeviceInfo()
  }
}
