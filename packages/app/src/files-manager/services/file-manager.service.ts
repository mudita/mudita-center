/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "@mudita/pure"
import * as CRC32 from "crc-32"
import { AppError } from "App/core/errors"
import { Result, ResultObject } from "App/core/builder"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import DeviceService from "App/__deprecated__/backend/device-service"
import { File } from "App/files-manager/dto"
import { DeviceDirectory } from "App/files-manager/constants"
import { FileObjectPresenter } from "App/files-manager/presenters"
import { FilesManagerError } from "App/files-manager/constants"

export class FileManagerService {
  constructor(
    private deviceService: DeviceService,
    private fileSystemService: FileSystemService
  ) {}

  public async getDeviceFiles(
    directory: DeviceDirectory
  ): Promise<ResultObject<File[] | undefined>> {
    const { data, status, error } = await this.deviceService.request({
      endpoint: Endpoint.FileSystem,
      method: Method.Get,
      body: {
        listDir: directory,
      },
    })

    if (status !== RequestResponseStatus.Ok || !data) {
      return Result.failed(
        new AppError(
          FilesManagerError.GetFiles,
          error ? error.message : "Something wen't wrong"
        )
      )
    }

    return Result.success(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      data[directory].map(FileObjectPresenter.toFile)
    )
  }

  public async uploadFiles(
    directory: DeviceDirectory,
    paths: string[]
  ): Promise<ResultObject<string[] | undefined>> {
    const results = []

    for await (const path of paths) {
      results.push(await this.uploadFile(directory, path))
    }

    const success = results.every((res) => res.ok)

    if (success) {
      return Result.success(paths)
    }

    return Result.failed(
      new AppError(FilesManagerError.UploadFiles, "Upload failed")
    )
  }

  private async uploadFile(
    directory: DeviceDirectory,
    path: string
  ): Promise<ResultObject<undefined>> {
    const data = await this.fileSystemService.readFile(path)
    const fileSize = Buffer.byteLength(data)
    const fileCrc32 = this.countCRC32(data)
    const fileName = path.split("/").reverse()[0]

    const response = await this.deviceService.request({
      endpoint: Endpoint.FileSystem,
      method: Method.Put,
      body: {
        fileSize,
        fileCrc32,
        fileName: [directory, fileName].join("/"),
      },
    })

    if (
      response.status !== RequestResponseStatus.Ok ||
      response.data === undefined
    ) {
      return Result.failed(
        new AppError(
          "",
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

      const response = await this.deviceService.request({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          txID,
          chunkNo,
          data: chunkedBuffer.toString("base64"),
        },
      })

      if (response.status !== RequestResponseStatus.Ok) {
        return Result.failed(
          new AppError(
            "",
            "Uploading file: Something went wrong in sent chunk fie."
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
          "",
          error
            ? (error as Error).message
            : "Uploading file: Something went wrong in sent chunk fie."
        )
      )
    }
  }

  private countCRC32(buffer: Buffer | Uint8Array): string {
    const crc = CRC32.buf(buffer)
    return (crc >>> 0).toString(16).padStart(8, "0").toLowerCase()
  }
}
