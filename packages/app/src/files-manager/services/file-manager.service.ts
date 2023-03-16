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
import { DeviceFileSystemService } from "App/device-file-system/services"
import { FileTransferStatus } from "App/device/types/mudita-os"

export class FileManagerService {
  constructor(
    private fileDeleteCommand: FileDeleteCommand,
    private retrieveFilesCommand: RetrieveFilesCommand,
    private fileUploadCommand: FileUploadCommand,
    private deviceFileSystemService: DeviceFileSystemService
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
    const results = []

    await this.deviceFileSystemService.changeFileTransferStatus(
      FileTransferStatus.Start
    )

    for await (const filePath of filePaths) {
      results.push(await this.fileUploadCommand.exec(directory, filePath))
    }
    await this.deviceFileSystemService.changeFileTransferStatus(
      FileTransferStatus.Finish
    )

    const success = results.every((result) => result.ok)
    const noSpaceLeft = results.some(
      (result) => result.error?.type === DeviceFileSystemError.NoSpaceLeft
    )

    if (noSpaceLeft) {
      return Result.failed(
        new AppError(
          FilesManagerError.NotEnoughSpace,
          "Not enough space on your device"
        )
      )
    }

    if (!success) {
      return Result.failed(
        new AppError(FilesManagerError.UploadFiles, "Upload failed")
      )
    }

    return Result.success(filePaths)
  }

  public async deleteFiles(
    filePaths: string[]
  ): Promise<ResultObject<string[] | undefined>> {
    const results = []

    for await (const filePath of filePaths) {
      results.push(await this.fileDeleteCommand.exec(filePath))
    }

    const success = results.every((result) => result.ok)

    if (!success) {
      return Result.failed(
        new AppError(FilesManagerError.DeleteFiles, "Delete failed")
      )
    }

    return Result.success(filePaths)
  }
}
