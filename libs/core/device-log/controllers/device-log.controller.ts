/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { ResultObject } from "Core/core/builder"
import { DeviceLogService } from "Core/device-log/services"
import { IpcDeviceLogEvent } from "Core/device-log/constants"
import { DeviceFile } from "Core/device-file-system/dto"
import { DeviceFilesOption } from "Core/device-file-system/types"

export class DeviceLogController {
  constructor(private deviceInfoService: DeviceLogService) {}

  @IpcEvent(IpcDeviceLogEvent.GetLog)
  public async getLog(
    options?: DeviceFilesOption
  ): Promise<ResultObject<DeviceFile[]>> {
    return this.deviceInfoService.downloadDeviceLogs(options)
  }
}
