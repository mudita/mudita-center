/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "App/core/builder"
import { Controller, IpcEvent } from "App/core/decorators"
import {
  ControllerPrefix,
  IpcDeviceFileSystemEvent,
} from "App/device-file-system/constants"
import { DeviceFileSystemService } from "App/device-file-system/services"
import {
  UploadFile,
  UploadFileLocally,
  DeviceFile,
} from "App/device-file-system/dto"

@Controller(ControllerPrefix)
export class DeviceFileSystemController {
  constructor(private deviceFileSystemService: DeviceFileSystemService) {}

  @IpcEvent(IpcDeviceFileSystemEvent.DownloadDeviceFiles)
  public async downloadDeviceFiles(
    payload: string[]
  ): Promise<ResultObject<DeviceFile[]>> {
    return this.deviceFileSystemService.downloadDeviceFiles(payload)
  }

  @IpcEvent(IpcDeviceFileSystemEvent.RemoveDeviceFile)
  public async removeDeviceFile(
    payload: string
  ): Promise<ResultObject<boolean>> {
    return this.deviceFileSystemService.removeDeviceFile(payload)
  }

  @IpcEvent(IpcDeviceFileSystemEvent.UploadFileLocally)
  public async uploadFileLocally(
    payload: UploadFileLocally
  ): Promise<ResultObject<boolean>> {
    return this.deviceFileSystemService.uploadFileLocally(payload)
  }

  @IpcEvent(IpcDeviceFileSystemEvent.UploadFileToDevice)
  public async uploadFile(payload: UploadFile): Promise<ResultObject<boolean>> {
    return this.deviceFileSystemService.uploadFile(payload)
  }
}
