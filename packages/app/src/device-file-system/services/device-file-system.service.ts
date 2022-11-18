/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as fs from "fs"
import stream from "stream"
import path from "path"
import { AppError } from "App/core/errors"
import { ResultObject, Result } from "App/core/builder"
import { Endpoint, Method } from "App/device/constants"
import DeviceService from "App/__deprecated__/backend/device-service"
import logger from "App/__deprecated__/main/utils/logger"
import countCRC32 from "App/device-file-system/helpers/count-crc32"
import { FileSystemService } from "App/file-system/services/file-system.service"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import {
  DownloadDeviceFileLocallyOptions,
  UploadFile,
  UploadFileLocally,
  DeviceFile,
  EncodedFile,
} from "App/device-file-system/dto"

export class DeviceFileSystemService {
  constructor(private deviceService: DeviceService) {}

  public async downloadDeviceFilesLocally(
    filePaths: string[],
    options: DownloadDeviceFileLocallyOptions
  ): Promise<ResultObject<string[]>> {
    const data: string[] = []

    if (!fs.existsSync(options.cwd)) {
      fs.mkdirSync(options.cwd, {
        recursive: true,
      })
    }

    for (let i = 0; i < filePaths.length; i++) {
      const response = await this.downloadDeviceFileLocally(
        filePaths[i],
        options
      )

      if (response.ok && response.data) {
        data.push(...response.data)
      } else {
        return Result.failed(new AppError("", ""))
      }
    }

    return Result.success(data)
  }

  public async downloadDeviceFiles(
    filePaths: string[]
  ): Promise<ResultObject<DeviceFile[]>> {
    const data: DeviceFile[] = []
    for (let i = 0; i < filePaths.length; i++) {
      const filePath = filePaths[i]
      const response = await this.downloadFile(filePath)

      if (response.ok && response.data) {
        const name = filePath.split("/").pop() as string
        data.push({ name, data: response.data })
      } else {
        return Result.failed(new AppError("", ""))
      }
    }

    return Result.success(data)
  }

  public async downloadFile(filePath: string): Promise<ResultObject<Buffer>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.FileSystem,
      method: Method.Get,
      body: {
        fileName: filePath,
      },
    })

    if (status !== RequestResponseStatus.Ok || data === undefined) {
      return Result.failed(
        new AppError(
          "",
          "Get device logs: Something went wrong in init downloading request"
        )
      )
    }

    const { rxID, fileSize, chunkSize } = data
    const chunkLength = fileSize > chunkSize ? fileSize / chunkSize : 1
    const downloadFileResponse = await this.downloadEncodedFile(
      rxID,
      chunkLength
    )

    if (
      downloadFileResponse.ok &&
      downloadFileResponse.data !== undefined &&
      downloadFileResponse.data.fileCrc32 !== undefined
    ) {
      const fileBuffer = Buffer.from(downloadFileResponse.data.file, "base64")
      const receivedFileCrc32 =
        downloadFileResponse.data.fileCrc32.toLowerCase()
      const countedFileCrc32 = countCRC32(fileBuffer)
      logger.info(
        `downloadFile crc: received ${receivedFileCrc32}, counted  ${countedFileCrc32}`
      )

      if (receivedFileCrc32 === countedFileCrc32) {
        return Result.success(fileBuffer)
      } else {
        return Result.failed(
          new AppError("", "Get device logs: File CRC32 mismatch")
        )
      }
    } else {
      return Result.failed(
        new AppError(
          "",
          "Get device logs: Something went wrong in downloading request"
        )
      )
    }
  }

  public async uploadFile({
    data,
    targetPath,
  }: UploadFile): Promise<ResultObject<boolean>> {
    const fileSize = Buffer.byteLength(data)
    const fileCrc32 = countCRC32(data)
    const response = await this.deviceService.request({
      endpoint: Endpoint.FileSystem,
      method: Method.Put,
      body: {
        fileSize,
        fileCrc32,
        fileName: targetPath,
      },
    })

    if (
      response.status !== RequestResponseStatus.Ok ||
      response.data === undefined
    ) {
      return Result.failed(
        new AppError(
          "",
          "Upload OS update package: Something went wrong in init sending request"
        )
      )
    }

    const { txID, chunkSize } = response.data
    return this.sendFileRequest(data, txID, chunkSize)
  }

  public async uploadFileLocally({
    filePath,
    targetPath,
  }: UploadFileLocally): Promise<ResultObject<boolean>> {
    try {
      const fileSize = fs.lstatSync(filePath).size
      const fileBuffer = fs.readFileSync(filePath)
      const fileCrc32 = countCRC32(fileBuffer)

      const { status, data } = await this.deviceService.request({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          fileSize,
          fileCrc32,
          fileName: targetPath,
        },
      })

      if (status !== RequestResponseStatus.Ok || data === undefined) {
        return Result.failed(
          new AppError(
            "",
            "Upload OS update package: Something went wrong in init sending request"
          )
        )
      }

      const { txID, chunkSize } = data
      const fd = fs.openSync(filePath, "r")
      return this.sendFileLocallyRequest(fd, txID, chunkSize)
    } catch {
      return Result.failed(
        new AppError(
          "",
          "Upload OS update package: Something went wrong in open file"
        )
      )
    }
  }

  public async removeDeviceFile(
    removeFile: string
  ): Promise<ResultObject<boolean>> {
    if (!removeFile) {
      return Result.failed(new AppError("", ""))
    }

    const { status } = await this.deviceService.request({
      endpoint: Endpoint.FileSystem,
      method: Method.Delete,
      body: {
        removeFile,
      },
    })

    return Result.success(status === RequestResponseStatus.Ok)
  }

  private async downloadDeviceFileLocally(
    filePath: string,
    options: DownloadDeviceFileLocallyOptions
  ): Promise<ResultObject<string[]>> {
    const { data: result, ok } = await this.downloadFile(filePath)

    if (!ok || result === undefined) {
      return Result.failed(new AppError("", ""))
    } else {
      const data: string[] = []
      const { cwd, extract, token, key } = options
      const name = filePath.split("/").pop() as string

      if (!fs.existsSync(cwd)) {
        fs.mkdirSync(cwd, {
          recursive: true,
        })
      }

      try {
        const entryFilePath = path.join(cwd, name)
        const input = new stream.PassThrough()
        input.end(result)

        if (extract === true && token !== undefined) {
          await FileSystemService.encryptViaTokenWithExtractionAndStreamToFiles(
            input,
            cwd,
            token
          )
        } else if (token !== undefined) {
          const entryFilePaths =
            await FileSystemService.encryptViaTokenAndStreamToFile(
              input,
              entryFilePath,
              token
            )
          data.push(...entryFilePaths)
        } else if (key !== undefined) {
          await FileSystemService.encryptAndStreamToFile(
            input,
            entryFilePath,
            key
          )
          data.push(entryFilePath)
        } else {
          await FileSystemService.streamToFile(input, entryFilePath)
          data.push(entryFilePath)
        }

        return Result.success(data)
      } catch (error) {
        return Result.failed(new AppError("", ""))
      }
    }
  }

  private async sendFileRequest(
    buffer: Buffer,
    txID: string,
    chunkSize: number,
    chunkNo = 1
  ): Promise<ResultObject<boolean>> {
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
            "Upload OS update package: Something went wrong in sent chunk file."
          )
        )
      } else {
        if (lastChunk) {
          return Result.success(true)
        }
        return this.sendFileRequest(buffer, txID, chunkSize, chunkNo + 1)
      }
    } catch {
      return Result.failed(
        new AppError(
          "",
          "Upload OS update package: Something went wrong in read file"
        )
      )
    }
  }

  private async sendFileLocallyRequest(
    fd: number,
    txID: string,
    chunkSize: number,
    chunkNo = 1
  ): Promise<ResultObject<boolean>> {
    try {
      const buffer = Buffer.alloc(chunkSize)
      const nread = fs.readSync(fd, buffer, 0, chunkSize, null)

      if (nread === 0) {
        fs.closeSync(fd)
        return Result.success(true)
      }

      const lastChunk = nread < chunkSize
      const dataBuffer = lastChunk ? buffer.slice(0, nread) : buffer

      const response = await this.deviceService.request({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          txID,
          chunkNo,
          data: dataBuffer.toString("base64"),
        },
      })

      if (response.status !== RequestResponseStatus.Ok) {
        fs.closeSync(fd)
        return Result.failed(
          new AppError(
            "",
            "Upload OS update package: Something went wrong in sent chunk fie."
          )
        )
      } else {
        return this.sendFileLocallyRequest(fd, txID, chunkSize, chunkNo + 1)
      }
    } catch {
      return Result.failed(
        new AppError(
          "",
          "Upload OS update package: Something went wrong in read file"
        )
      )
    }
  }

  private async downloadEncodedFile(
    rxID: string,
    chunkLength: number,
    chunkNo = 1,
    chunkedString = ""
  ): Promise<ResultObject<EncodedFile>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.FileSystem,
      method: Method.Get,
      body: {
        rxID,
        chunkNo,
      },
    })

    if (status !== RequestResponseStatus.Ok || data === undefined) {
      return Result.failed(
        new AppError("", "Download encoded file: Something went wrong")
      )
    }

    const string = `${chunkedString}${data.data}`

    if (chunkNo < chunkLength) {
      return this.downloadEncodedFile(rxID, chunkLength, chunkNo + 1, string)
    } else {
      return Result.success({
        file: string,
        fileCrc32: data.fileCrc32,
      })
    }
  }
}
