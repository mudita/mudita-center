/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ResultObject } from "App/core/builder"
import { DeviceLogService } from "App/device-log/services"
import { ControllerPrefix, IpcDeviceLogEvent } from "App/device-log/constants"
import { DeviceFile } from "App/device-file-system/dto"
import { DeviceFilesOption } from "App/device-file-system/types"

@Controller(ControllerPrefix)
export class DeviceLogController {
  constructor(private deviceInfoService: DeviceLogService) {}

  @IpcEvent(IpcDeviceLogEvent.GetLog)
  public async getLog(
    options?: DeviceFilesOption
  ): Promise<ResultObject<DeviceFile[]>> {
    return this.deviceInfoService.downloadDeviceLogs(options)
  }
}
