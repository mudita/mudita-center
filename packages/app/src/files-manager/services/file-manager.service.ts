/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "App/core/errors"
import { Result, ResultObject } from "App/core/builder"
import { File, UploadFilesInput, GetFilesInput } from "App/files-manager/dto"
import { FileObjectPresenter } from "App/files-manager/presenters"
import { FilesManagerError } from "App/files-manager/constants"
import {
  RetrieveFilesCommand,
  FileUploadCommand,
} from "App/device-file-system/commands"
import { DeviceFileSystemError } from "App/device-file-system/constants"
import { FileDeleteCommand } from "App/device-file-system/commands/file-delete.command"

export class FileManagerService {
  constructor(
    private fileDeleteCommand: FileDeleteCommand,
    private retrieveFilesCommand: RetrieveFilesCommand,
    private fileUploadCommand: FileUploadCommand
  ) {}

  public async getDeviceFiles({
    directory,
    filter,
  }: GetFilesInput): Promise<ResultObject<File[] | undefined>> {
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
      result.data[directory]
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        .map(FileObjectPresenter.toFile)
        .filter((file) =>
          FileObjectPresenter.isDeviceFileFilterMatch(file, filter)
        )
    )
  }

  public async uploadFiles({
    directory,
    filePaths,
  }: UploadFilesInput): Promise<ResultObject<string[] | undefined>> {
    for await (const filePath of filePaths) {
      try {
        const result = await this.fileUploadCommand.exec(directory, filePath)
        if (result.error?.type === DeviceFileSystemError.NoSpaceLeft) {
          return Result.failed(
            new AppError(
              FilesManagerError.NotEnoughSpace,
              "Not enough space on your device"
            )
          )
        }
        if (result.error?.type === DeviceFileSystemError.UnsupportedFileSize) {
          return Result.failed(
            new AppError(
              FilesManagerError.UnsupportedFileSize,
              "Unsupported file size"
            )
          )
        }
        if (!result.ok) {
          return Result.failed(
            new AppError(FilesManagerError.UploadFiles, "Upload failed")
          )
        }
      } catch (error) {
        return Result.failed(
          new AppError(FilesManagerError.UploadFiles, "Upload failed")
        )
      }
    }

    return Result.success(filePaths)
  }

  public async deleteFiles(
    filePaths: string[]
  ): Promise<ResultObject<string[] | undefined>> {
    for await (const filePath of filePaths) {
      const result = await this.fileDeleteCommand.exec(filePath)
      if (!result.ok) {
        return Result.failed(
          new AppError(FilesManagerError.DeleteFiles, "Delete failed")
        )
      }
    }

    return Result.success(filePaths)
  }
}
