/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as fs from "fs"
import * as CRC32 from "crc-32"
import { Endpoint, Method } from "@mudita/pure"
import DeviceService from "Backend/device-service"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

class DeviceFileSystemService {
  constructor(private deviceService: DeviceService) {}

  async downloadFile(filePath: string): Promise<DeviceResponse<string>> {
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

    const { rxID, fileSize, chunkSize, fileCrc32 } = data
    const chunkLength = fileSize > chunkSize ? fileSize / chunkSize : 1
    const downloadFileResponse = await this.downloadEncodedFile(
      rxID,
      chunkLength
    )

    if (
      downloadFileResponse.status === DeviceResponseStatus.Ok &&
      downloadFileResponse.data !== undefined
    ) {
      const buffer = Buffer.from(downloadFileResponse.data, "base64")
      const receivedFileCrc32 = parseInt(fileCrc32, 16)
      const countedFileCrc32 = CRC32.buf(buffer)

      if(receivedFileCrc32 === countedFileCrc32){
        return {
          status: DeviceResponseStatus.Ok,
          data: buffer.toString(),
        }
      } else {
        return {
          status: DeviceResponseStatus.Error,
          error: {
            message:
              "Get device logs: File CRC32 mismatch",
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

  async uploadFile(
    filePath: string,
    targetPath: string
  ): Promise<DeviceResponse> {
    try {
      const fileSize = fs.lstatSync(filePath).size
      const fileBuffer = fs.readFileSync(filePath)
      const fileCrc32 = CRC32.buf(fileBuffer).toString(16).padStart(8, '0')

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
      return this.sendFileRequest(fd, txID, chunkSize)
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
        return this.sendFileRequest(fd, txID, chunkSize, chunkNo + 1)
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
  ): Promise<DeviceResponse<string>> {
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
        data: string,
      }
    }
  }
}

export const createDeviceFileSystemService = (
  deviceService: DeviceService
): DeviceFileSystemService => new DeviceFileSystemService(deviceService)

export default DeviceFileSystemService
