/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "Core/core/errors"
import { Result, ResultObject } from "Core/core/builder"
import { File, UploadFilesInput, GetFilesInput } from "Core/files-manager/dto"
import { FileObjectPresenter } from "Core/files-manager/presenters"
import { FilesManagerError } from "Core/files-manager/constants"
import {
  RetrieveFilesCommand,
  FileUploadCommand,
} from "Core/device-file-system/commands"
import { DeviceFileSystemError } from "Core/device-file-system/constants"
import { FileDeleteCommand } from "Core/device-file-system/commands/file-delete.command"
import { DeviceProtocol } from "device-protocol/feature"

export class FileManagerService {
  constructor(
    protected deviceProtocol: DeviceProtocol,
    private fileDeleteCommand: FileDeleteCommand,
    private retrieveFilesCommand: RetrieveFilesCommand,
    private fileUploadCommand: FileUploadCommand
  ) {}

  public async getDeviceFiles(
    { directory, filter }: GetFilesInput,
    deviceId = this.deviceProtocol.device.id
  ): Promise<ResultObject<File[] | undefined>> {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await this.retrieveFilesCommand.exec(directory, deviceId)

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
    for (const filePath of filePaths) {
      try {
        const { error, ok } = await this.fileUploadCommand.exec(
          directory,
          filePath
        )
        if (error?.type === DeviceFileSystemError.NoSpaceLeft) {
          return Result.failed(
            new AppError(
              FilesManagerError.NotEnoughSpace,
              "Not enough space on your device"
            )
          )
        }
        if (error?.type === DeviceFileSystemError.UnsupportedFileSize) {
          return Result.failed(
            new AppError(
              FilesManagerError.UnsupportedFileSize,
              "Unsupported file size"
            )
          )
        }
        if (!ok) {
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
    for (const filePath of filePaths) {
      const { ok } = await this.fileDeleteCommand.exec(filePath)
      if (!ok) {
        return Result.failed(
          new AppError(FilesManagerError.DeleteFiles, "Delete failed")
        )
      }
    }

    return Result.success(filePaths)
  }
}
