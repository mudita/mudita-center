/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ResultObject } from "App/core/builder"
import {
  ControllerPrefix,
  IpcFilesManagerEvent,
} from "App/files-manager/constants"
import { File, UploadFilesInput, GetFilesInput } from "App/files-manager/dto"
import { FileManagerService } from "App/files-manager/services"

@Controller(ControllerPrefix)
export class FilesManagerController {
  constructor(private fileManagerService: FileManagerService) {}

  @IpcEvent(IpcFilesManagerEvent.GetFiles)
  public async getFiles(
    input: GetFilesInput
  ): Promise<ResultObject<File[] | undefined>> {
    return this.fileManagerService.getDeviceFiles(input)
  }

  @IpcEvent(IpcFilesManagerEvent.UploadFiles)
  public async uploadFiles(
    input: UploadFilesInput
  ): Promise<ResultObject<string[] | undefined>> {
    return this.fileManagerService.uploadFiles(input)
  }
  @IpcEvent(IpcFilesManagerEvent.DeleteFiles)
  public async deleteFiles(
    paths: string[]
  ): Promise<ResultObject<string[] | undefined>> {
    return this.fileManagerService.deleteFiles(paths)
  }
}
