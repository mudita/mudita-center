/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ResultObject } from "App/core/builder"
import {
  ControllerPrefix,
  IpcFilesManagerEvent,
  DeviceDirectory,
} from "App/files-manager/constants"
import { File, UploadFileInput } from "App/files-manager/dto"
import { FileManagerService } from "App/files-manager/services"

@Controller(ControllerPrefix)
export class FilesManagerController {
  constructor(private fileManagerService: FileManagerService) {}

  @IpcEvent(IpcFilesManagerEvent.GetFiles)
  public async getFiles(
    directory: DeviceDirectory
  ): Promise<ResultObject<File[] | undefined>> {
    return this.fileManagerService.getDeviceFiles(directory)
  }

  @IpcEvent(IpcFilesManagerEvent.UploadFiles)
  public async uploadFiles({
    directory,
    paths,
  }: UploadFileInput): Promise<ResultObject<string[] | undefined>> {
    return this.fileManagerService.uploadFiles(directory, paths)
  }
}
