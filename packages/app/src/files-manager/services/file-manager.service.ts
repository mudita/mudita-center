/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "App/core/errors"
import { Result, ResultObject } from "App/core/builder"
import { File, UploadFileInput } from "App/files-manager/dto"
import { DeviceDirectory } from "App/files-manager/constants"
import { FileObjectPresenter } from "App/files-manager/presenters"
import { FilesManagerError } from "App/files-manager/constants"
import {
  RetrieveFilesCommand,
  FileUploadCommand,
} from "App/device-file-system/commands"

export class FileManagerService {
  constructor(
    private retrieveFilesCommand: RetrieveFilesCommand,
    private fileUploadCommand: FileUploadCommand
  ) {}

  public async getDeviceFiles(
    directory: DeviceDirectory
  ): Promise<ResultObject<File[] | undefined>> {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await this.retrieveFilesCommand.exec(directory)

    if (!result.ok || !result.data) {
      return Result.failed(
        new AppError(
          FilesManagerError.GetFiles,
          result.error ? result.error.message : "Something went wrong"
        )
      )
    }

    return Result.success(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      result.data[directory].map(FileObjectPresenter.toFile)
    )
  }

  public async uploadFile({
    directory,
    paths,
  }: UploadFileInput): Promise<ResultObject<string[] | undefined>> {
    const results = []

    for await (const path of paths) {
      results.push(await this.fileUploadCommand.exec(directory, path))
    }

    const success = results.every((result) => result.ok)

    if (!success) {
      return Result.failed(
        new AppError(FilesManagerError.UploadFile, "Upload failed")
      )
    }

    return Result.success(paths)
  }
}
