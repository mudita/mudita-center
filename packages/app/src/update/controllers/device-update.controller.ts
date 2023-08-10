/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ResultObject } from "App/core/builder"
import { UpdateOS } from "App/update/dto"
import {
  DeviceUpdateFilesService,
  DeviceUpdateService,
} from "App/update/services"
import {
  DeviceUpdateControllerPrefix,
  IpcDeviceUpdateEvent,
} from "App/update/constants"

@Controller(DeviceUpdateControllerPrefix)
export class DeviceUpdateController {
  constructor(
    private deviceUpdateService: DeviceUpdateService,
    private deviceUpdateFilesService: DeviceUpdateFilesService
  ) {}

  @IpcEvent(IpcDeviceUpdateEvent.UpdateOS)
  public async updateOs(payload: UpdateOS): Promise<ResultObject<boolean>> {
    return this.deviceUpdateService.updateOs(payload)
  }

  @IpcEvent(IpcDeviceUpdateEvent.CheckUpdate)
  public async checkUpdate(): Promise<ResultObject<boolean>> {
    return this.deviceUpdateService.checkUpdate()
  }

  @IpcEvent(IpcDeviceUpdateEvent.RemoveDownloadedOsUpdates)
  public async removeDownloadedOsUpdates(): Promise<void> {
    return this.deviceUpdateFilesService.removeDownloadedOsUpdates()
  }
}
