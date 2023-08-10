/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Endpoint, Method } from "App/device/constants"
import { PutFileSystemResponseBody } from "App/device/types/mudita-os"
import { DeviceManager } from "App/device-manager/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AppError } from "App/core/errors"
import { Result, ResultObject } from "App/core/builder"
import { BaseCommand } from "App/device-file-system/commands/base.command"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { DeviceFileSystemError } from "App/device-file-system/constants"

export class FileUploadCommand extends BaseCommand {
  constructor(
    public deviceManager: DeviceManager,
    public fileSystemService: FileSystemService
  ) {
    super(deviceManager)
  }

  public async exec(
    directory: string,
    filePath: string
  ): Promise<ResultObject<undefined>> {
    let data: Buffer | Uint8Array
    const maxFileSize = 2000000000

    try {
      const fileSize = await this.fileSystemService.getFileSize(filePath)
      if (fileSize >= maxFileSize) {
        return Result.failed(
          new AppError(
            DeviceFileSystemError.UnsupportedFileSize,
            `Uploading file: file ${filePath} is too large`
          )
        )
      }
      data = await this.fileSystemService.readFile(filePath)
    } catch (err) {
      return Result.failed(
        new AppError(
          DeviceFileSystemError.FileUploadUnreadable,
          `Uploading file: file ${filePath} can't be opened`
        )
      )
    }

    const fileSize = Buffer.byteLength(data)
    const fileCrc32 = this.countCRC32(data)
    const fileName = path.basename(filePath)

    const response =
      await this.deviceManager.device.request<PutFileSystemResponseBody>({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          fileSize,
          fileCrc32,
          fileName: [directory, fileName].join("/"),
        },
      })

    if (!response.ok || response.data === undefined) {
      if (
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        response.error?.payload?.status ===
        RequestResponseStatus.InsufficientStorage
      ) {
        return Result.failed(
          new AppError(
            DeviceFileSystemError.NoSpaceLeft,
            "Not enough space on device"
          )
        )
      }

      return Result.failed(
        new AppError(
          DeviceFileSystemError.FileUploadRequest,
          "Uploading file: Something went wrong in init sending request"
        )
      )
    }

    const { txID, chunkSize } = response.data
    return this.sendFileRequest(data, txID, chunkSize)
  }

  private async sendFileRequest(
    buffer: Buffer | Uint8Array,
    txID: string,
    chunkSize: number,
    chunkNo = 1
  ): Promise<ResultObject<undefined>> {
    try {
      const sliceStart = (chunkNo - 1) * chunkSize
      const sliceEnd = sliceStart + chunkSize
      const chunkedBuffer = buffer.slice(sliceStart, sliceEnd)
      const chunkedBufferSize = Buffer.byteLength(chunkedBuffer)
      const lastChunk = chunkedBufferSize < chunkSize

      const response = await this.deviceManager.device.request({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          txID,
          chunkNo,
          data: chunkedBuffer.toString("base64"),
        },
      })

      if (!response.ok) {
        return Result.failed(
          new AppError(
            DeviceFileSystemError.FileUploadChunk,
            "Uploading file: Something went wrong in sent chunk file"
          )
        )
      } else {
        if (lastChunk) {
          return Result.success(undefined)
        }
        return this.sendFileRequest(buffer, txID, chunkSize, chunkNo + 1)
      }
    } catch (error) {
      return Result.failed(
        new AppError(
          DeviceFileSystemError.FileUploadChunk,
          error
            ? (error as Error).message
            : "Uploading file: Something went wrong in sent chunk file"
        )
      )
    }
  }
}
