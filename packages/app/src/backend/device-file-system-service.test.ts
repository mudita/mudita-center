/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import DeviceService from "Backend/device-service"
import PureDeviceManager, { DownloadFileSystemRequestConfig, GetFileSystemRequestConfig } from "@mudita/pure"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import {
  firstsPartDecodeLog,
  firstsPartEncodeLog, secondsPartDecodeLog,
  secondsPartEncodeLog,
} from "Backend/adapters/pure-phone/mock-data-logs"

import { createDeviceFileSystemService } from "Backend/device-file-system-service"
jest.mock("Backend/device-service")

test("downloading file handle properly chunks data", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
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
            data: {
              data: secondsPartEncodeLog,
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
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { status, data } = await deviceFileSystemService.downloadFile("/sys/user/mock-file-name.log")
  expect(status).toEqual(DeviceResponseStatus.Ok)
  expect(data).toEqual(`${firstsPartDecodeLog}${secondsPartDecodeLog}`)
})

test("downloading file handle properly chunks data if fileSize is less than chunkSize", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: (
        config: GetFileSystemRequestConfig | DownloadFileSystemRequestConfig
      ) => {
        if (
          (config as GetFileSystemRequestConfig).body?.fileName !== undefined
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: { rxID: "1", fileSize: 0.5, chunkSize: 1 },
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
        } else {
          return {
            status: DeviceResponseStatus.Error,
          }
        }
      },
    }
  })
  const deviceFileSystemService = createDeviceFileSystemService(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { status, data } = await deviceFileSystemService.downloadFile("/sys/user/mock-file-name.log")
  expect(status).toEqual(DeviceResponseStatus.Ok)
  expect(data).toEqual(firstsPartDecodeLog)
})

test("downloading file return error when part of the chunks data is broken", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
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
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { status, data } = await deviceFileSystemService.downloadFile("/sys/user/mock-file-name.log")
  expect(status).toEqual(DeviceResponseStatus.Error)
  expect(data).toEqual(undefined)
})

test("downloading file returns error properly", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: DeviceResponseStatus.Error,
        }
      },
    }
  })
  const deviceFileSystemService = createDeviceFileSystemService(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { status } = await deviceFileSystemService.downloadFile("/sys/user/mock-file-name.log")
  expect(status).toEqual(DeviceResponseStatus.Error)
})
