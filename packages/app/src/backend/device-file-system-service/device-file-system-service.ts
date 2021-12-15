/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import * as fs from "fs"
import { Endpoint, Method } from "@mudita/pure"
import getAppPath from "App/main/utils/get-app-path"
import writeFile from "App/main/utils/write-file"
import DeviceService from "Backend/device-service"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import logger from "App/main/utils/logger"
import countCRC32 from "Backend/helpers/count-crc32"

// FIXME: node application should operate on a buffer to avoids corrupting binary files
export interface DeviceFileDeprecated extends Pick<File, "name"> {
  data: string
}

export interface DeviceFile extends Pick<File, "name"> {
  data: Buffer
}

export interface EncodedResponse {
  file: string
  fileCrc32?: string
}

export interface UploadFilePayload {
  data: Buffer
  targetPath: string
}

export interface UploadFileLocallyPayload {
  filePath: string
  targetPath: string
}

export class DeviceFileSystemService {
  constructor(public deviceService: DeviceService) {}

  async downloadLocally(
    filePaths: string[],
    fileDirectory: string
  ): Promise<DeviceResponse<string[]>> {
    const data: string[] = []

    for (let i = 0; i < filePaths.length; i++) {
      const filePath = filePaths[i]
      const response = await this.downloadFile(filePath)

      if (response.status === DeviceResponseStatus.Ok && response.data) {
        const name = filePath.split("/").pop() as string
        const targetPath = path.join(getAppPath(), fileDirectory)

        await writeFile({
          filePath: targetPath,
          data: response.data,
          fileName: name,
        })
        data.push(`${targetPath}/${name}`)
      } else {
        return {
          status: DeviceResponseStatus.Error,
        }
      }
    }

    return {
      data,
      status: DeviceResponseStatus.Ok,
    }
  }

  async downloadDeviceFiles(
    filePaths: string[]
  ): Promise<DeviceResponse<DeviceFileDeprecated[]>> {
    const data: DeviceFileDeprecated[] = []
    for (let i = 0; i < filePaths.length; i++) {
      const filePath = filePaths[i]
      const response = await this.downloadFileDeprecated(filePath)

      if (response.status === DeviceResponseStatus.Ok && response.data) {
        const name = filePath.split("/").pop() as string
        data.push({ name, data: response.data })
      } else {
        return {
          status: DeviceResponseStatus.Error,
        }
      }
    }

    return {
      data,
      status: DeviceResponseStatus.Ok,
    }
  }

  // FIXME: node application should operate on a buffer to avoids corrupting binary files
  async downloadFileDeprecated(
    filePath: string
  ): Promise<DeviceResponse<string>> {
    const response = await this.downloadFile(filePath)
    if (response.data !== undefined) {
      return {
        ...response,
        data: response.data.toString(),
      }
    } else {
      return {
        status: response.status,
      }
    }
  }

  async downloadFile(filePath: string): Promise<DeviceResponse<Buffer>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.FileSystem,
      method: Method.Get,
      body: {
        fileName: filePath,
      },
    })

    if (status !== DeviceResponseStatus.Ok || data === undefined) {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message:
            "Get device logs: Something went wrong in init downloading request",
        },
      }
    }

    const { rxID, fileSize, chunkSize } = data
    const chunkLength = fileSize > chunkSize ? fileSize / chunkSize : 1
    const downloadFileResponse = await this.downloadEncodedFile(
      rxID,
      chunkLength
    )

    if (
      downloadFileResponse.status === DeviceResponseStatus.Ok &&
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
        return {
          status: DeviceResponseStatus.Ok,
          data: fileBuffer,
        }
      } else {
        return {
          status: DeviceResponseStatus.Error,
          error: {
            message: "Get device logs: File CRC32 mismatch",
          },
        }
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message:
            "Get device logs: Something went wrong in downloading request",
        },
      }
    }
  }

  async uploadFile({
    data,
    targetPath,
  }: UploadFilePayload): Promise<DeviceResponse> {
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
      response.status !== DeviceResponseStatus.Ok ||
      response.data === undefined
    ) {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message:
            "Upload OS update package: Something went wrong in init sending request",
        },
      }
    }

    const { txID, chunkSize } = response.data
    return this.sendFileRequest(data, txID, chunkSize)
  }

  async uploadFileLocally({
    filePath,
    targetPath,
  }: UploadFileLocallyPayload): Promise<DeviceResponse> {
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

      if (status !== DeviceResponseStatus.Ok || data === undefined) {
        return {
          status: DeviceResponseStatus.Error,
          error: {
            message:
              "Upload OS update package: Something went wrong in init sending request",
          },
        }
      }

      const { txID, chunkSize } = data
      const fd = fs.openSync(filePath, "r")
      return this.sendFileLocallyRequest(fd, txID, chunkSize)
    } catch {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message:
            "Upload OS update package: Something went wrong in open file",
        },
      }
    }
  }

  private async sendFileRequest(
    buffer: Buffer,
    txID: string,
    chunkSize: number,
    chunkNo = 1
  ): Promise<DeviceResponse> {
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

      if (response.status !== DeviceResponseStatus.Ok) {
        return {
          status: DeviceResponseStatus.Error,
          error: {
            message:
              "Upload OS update package: Something went wrong in sent chunk fie.",
          },
        }
      } else {
        if (lastChunk) {
          return {
            status: DeviceResponseStatus.Ok,
          }
        }
        return this.sendFileRequest(buffer, txID, chunkSize, chunkNo + 1)
      }
    } catch {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message:
            "Upload OS update package: Something went wrong in read file",
        },
      }
    }
  }

  private async sendFileLocallyRequest(
    fd: number,
    txID: string,
    chunkSize: number,
    chunkNo = 1
  ): Promise<DeviceResponse> {
    try {
      const buffer = Buffer.alloc(chunkSize)
      const nread = fs.readSync(fd, buffer, 0, chunkSize, null)

      if (nread === 0) {
        fs.closeSync(fd)
        return {
          status: DeviceResponseStatus.Ok,
        }
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

      if (response.status !== DeviceResponseStatus.Ok) {
        fs.closeSync(fd)

        return {
          status: DeviceResponseStatus.Error,
          error: {
            message:
              "Upload OS update package: Something went wrong in sent chunk fie.",
          },
        }
      } else {
        return this.sendFileLocallyRequest(fd, txID, chunkSize, chunkNo + 1)
      }
    } catch {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message:
            "Upload OS update package: Something went wrong in read file",
        },
      }
    }
  }

  private async downloadEncodedFile(
    rxID: string,
    chunkLength: number,
    chunkNo = 1,
    chunkedString = ""
  ): Promise<DeviceResponse<EncodedResponse>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.FileSystem,
      method: Method.Get,
      body: {
        rxID,
        chunkNo,
      },
    })

    if (status !== DeviceResponseStatus.Ok || data === undefined) {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Download encoded file: Something went wrong" },
      }
    }

    const string = `${chunkedString}${data.data}`

    if (chunkNo < chunkLength) {
      return this.downloadEncodedFile(rxID, chunkLength, chunkNo + 1, string)
    } else {
      return {
        status,
        data: {
          file: string,
          fileCrc32: data.fileCrc32,
        },
      }
    }
  }
}

export const createDeviceFileSystemService = (
  deviceService: DeviceService
): DeviceFileSystemService => new DeviceFileSystemService(deviceService)

export default DeviceFileSystemService
