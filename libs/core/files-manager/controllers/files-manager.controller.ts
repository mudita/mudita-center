/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { ResultObject } from "Core/core/builder"
import { IpcFilesManagerEvent } from "Core/files-manager/constants"
import { File, UploadFilesInput, GetFilesInput } from "Core/files-manager/dto"
import { FileManagerService } from "Core/files-manager/services"

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
