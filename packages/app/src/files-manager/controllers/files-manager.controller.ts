/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import {
  ControllerPrefix,
  IpcFilesManagerEvent,
} from "App/files-manager/constants"
import { McUsbFile } from "@mudita/pure"
import { DeviceService } from "Backend/device-service"

@Controller(ControllerPrefix)
export class FilesManagerController {
  constructor(private deviceService: DeviceService) {}

  @IpcEvent(IpcFilesManagerEvent.GetFiles)
  public async getFiles(): Promise<McUsbFile[]> {
    return await this.deviceService.getFiles()
  }
}
