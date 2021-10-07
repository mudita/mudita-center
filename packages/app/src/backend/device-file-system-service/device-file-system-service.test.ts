/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import DeviceService from "Backend/device-service"
import MuditaDeviceManager, {
  DownloadFileSystemRequestConfig,
  GetFileSystemRequestConfig,
  PutFileSystemRequestConfig,
  SendFileSystemRequestConfig,
} from "@mudita/pure"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import {
  firstsPartDecodeLog,
  firstsPartEncodeLog,
  secondsPartDecodeLog,
  secondsPartEncodeLog,
} from "Backend/adapters/pure-phone/mock-data-logs"

import { createDeviceFileSystemService } from "Backend/device-file-system-service/device-file-system-service"
import path from "path"
jest.mock("Backend/device-service")

test("downloading file handle properly chunks data", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: (
        config: GetFileSystemRequestConfig | DownloadFileSystemRequestConfig
      ) => {
        if (
          (config as GetFileSystemRequestConfig).body?.fileName !== undefined
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              rxID: "1",
              fileSize: 2,
              chunkSize: 1,
            },
          }
        } else if (
          (config as DownloadFileSystemRequestConfig).body?.chunkNo === 1
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              data: firstsPartEncodeLog,
            },
          }
        } else if (
          (config as DownloadFileSystemRequestConfig).body?.chunkNo === 2
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              data: secondsPartEncodeLog,
              fileCrc32: "30898fa4",
            },
          }
        } else {
          return {
            status: DeviceResponseStatus.Error,
          }
        }
      },
    }
  })
  const deviceFileSystemService = createDeviceFileSystemService(
    new DeviceService(MuditaDeviceManager, ipcMain)
  )
  const { status, data } = await deviceFileSystemService.downloadFileDeprecated(
    "/sys/user/mock-file-name.log"
  )
  expect(status).toEqual(DeviceResponseStatus.Ok)
  expect(data).toEqual(`${firstsPartDecodeLog}${secondsPartDecodeLog}`)
})

test("downloading file handle properly chunks data if fileSize is less than chunkSize", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: (
        config: GetFileSystemRequestConfig | DownloadFileSystemRequestConfig
      ) => {
        if (
          (config as GetFileSystemRequestConfig).body?.fileName !== undefined
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              rxID: "1",
              fileSize: 0.5,
              chunkSize: 1,
            },
          }
        } else if (
          (config as DownloadFileSystemRequestConfig).body?.chunkNo === 1
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              data: firstsPartEncodeLog,
              fileCrc32: "91c634cd",
            },
          }
        } else {
          return {
            status: DeviceResponseStatus.Error,
          }
        }
      },
    }
  })
  const deviceFileSystemService = createDeviceFileSystemService(
    new DeviceService(MuditaDeviceManager, ipcMain)
  )
  const { status, data } = await deviceFileSystemService.downloadFileDeprecated(
    "/sys/user/mock-file-name.log"
  )
  expect(status).toEqual(DeviceResponseStatus.Ok)
  expect(data).toEqual(firstsPartDecodeLog)
})

test("downloading file return error when part of the chunks data is broken", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: (
        config: GetFileSystemRequestConfig | DownloadFileSystemRequestConfig
      ) => {
        if (
          (config as GetFileSystemRequestConfig).body?.fileName !== undefined
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: { rxID: "1", fileSize: 2, chunkSize: 1 },
          }
        } else if (
          (config as DownloadFileSystemRequestConfig).body?.chunkNo === 1
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              data: firstsPartEncodeLog,
            },
          }
        } else if (
          (config as DownloadFileSystemRequestConfig).body?.chunkNo === 2
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: undefined,
          }
        } else {
          return {
            status: DeviceResponseStatus.Error,
          }
        }
      },
    }
  })
  const deviceFileSystemService = createDeviceFileSystemService(
    new DeviceService(MuditaDeviceManager, ipcMain)
  )
  const { status, data } = await deviceFileSystemService.downloadFileDeprecated(
    "/sys/user/mock-file-name.log"
  )
  expect(status).toEqual(DeviceResponseStatus.Error)
  expect(data).toEqual(undefined)
})

test("downloading file returns error properly", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: DeviceResponseStatus.Error,
        }
      },
    }
  })
  const deviceFileSystemService = createDeviceFileSystemService(
    new DeviceService(MuditaDeviceManager, ipcMain)
  )
  const { status } = await deviceFileSystemService.downloadFileDeprecated(
    "/sys/user/mock-file-name.log"
  )
  expect(status).toEqual(DeviceResponseStatus.Error)
})

test("upload file file handle properly chunks data", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: (
        config: PutFileSystemRequestConfig | SendFileSystemRequestConfig
      ) => {
        if (
          (config as PutFileSystemRequestConfig).body?.fileName !== undefined
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: { txID: "1", chunkSize: 7 },
          }
        } else if (
          (config as SendFileSystemRequestConfig).body?.chunkNo === 1
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: { txID: "1", chunkNo: 1 },
          }
        } else if (
          (config as SendFileSystemRequestConfig).body?.chunkNo === 2
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: { txID: "1", chunkNo: 2 },
          }
        } else {
          return {
            status: DeviceResponseStatus.Error,
          }
        }
      },
    }
  })
  const deviceFileSystemService = createDeviceFileSystemService(
    new DeviceService(MuditaDeviceManager, ipcMain)
  )
  const filePath = path.join(__dirname, "./mock-file.txt")
  const { status } = await deviceFileSystemService.uploadFile({
    filePath,
    targetPath: "/sys/user",
  })
  expect(status).toEqual(DeviceResponseStatus.Ok)
})
