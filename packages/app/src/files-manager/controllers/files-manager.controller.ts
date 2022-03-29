/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import {
  ControllerPrefix,
  IpcFilesManagerEvent,
} from "App/files-manager/constants"
import { McUsbFile, McUsbDevice } from "App/mc-usb"

@Controller(ControllerPrefix)
export class FilesManagerController {
  constructor(private device: McUsbDevice) {}

  @IpcEvent(IpcFilesManagerEvent.GetFiles)
  public async getFiles(): Promise<McUsbFile[]> {
    return await this.device.getFiles()
  }
}
