/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import DeviceService from "Backend/device-service"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"
import PureDeviceManager, {
  DownloadFileSystemRequestPayload,
  GetFileSystemRequestPayload,
} from "@mudita/pure"
import {
  firstsPartDecodeLog,
  firstsPartEncodeLog,
  secondsPartDecodeLog,
  secondsPartEncodeLog,
} from "Backend/adapters/pure-phone/mock-data-logs"

jest.mock("Backend/device-service")

test("unlock device returns properly value", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: DeviceResponseStatus.Ok,
        }
      },
    }
  })
  const purePhoneAdapter = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { status } = await purePhoneAdapter.unlockDevice("3333")
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("get unlock device status returns properly value", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: DeviceResponseStatus.Ok,
        }
      },
    }
  })
  const purePhoneAdapter = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { status } = await purePhoneAdapter.getUnlockDeviceStatus()
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("get device file handle properly chunks data", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: (
        config: GetFileSystemRequestPayload | DownloadFileSystemRequestPayload
      ) => {
        if (
          (config as GetFileSystemRequestPayload).body?.fileName !== undefined
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: { rxID: "1", fileSize: 2, chunkSize: 1 },
          }
        } else if (
          (config as DownloadFileSystemRequestPayload).body?.chunkNo === 1
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              data: firstsPartEncodeLog,
            },
          }
        } else if (
          (config as DownloadFileSystemRequestPayload).body?.chunkNo === 2
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
  const purePhoneAdapter = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { status, data } = await purePhoneAdapter.getDeviceLogs()
  expect(status).toEqual(DeviceResponseStatus.Ok)
  expect(data).toEqual(`${firstsPartDecodeLog}${secondsPartDecodeLog}`)
})

test("get device file handle properly chunks data if fileSize is less than chunkSize", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: (
        config: GetFileSystemRequestPayload | DownloadFileSystemRequestPayload
      ) => {
        if (
          (config as GetFileSystemRequestPayload).body?.fileName !== undefined
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: { rxID: "1", fileSize: 0.5, chunkSize: 1 },
          }
        } else if (
          (config as DownloadFileSystemRequestPayload).body?.chunkNo === 1
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
  const purePhoneAdapter = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { status, data } = await purePhoneAdapter.getDeviceLogs()
  expect(status).toEqual(DeviceResponseStatus.Ok)
  expect(data).toEqual(firstsPartDecodeLog)
})

test("get device file return error when part of the chunks data is broken", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: (
        config: GetFileSystemRequestPayload | DownloadFileSystemRequestPayload
      ) => {
        if (
          (config as GetFileSystemRequestPayload).body?.fileName !== undefined
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: { rxID: "1", fileSize: 2, chunkSize: 1 },
          }
        } else if (
          (config as DownloadFileSystemRequestPayload).body?.chunkNo === 1
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              data: firstsPartEncodeLog,
            },
          }
        } else if (
          (config as DownloadFileSystemRequestPayload).body?.chunkNo === 2
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
  const purePhoneAdapter = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { status, data } = await purePhoneAdapter.getDeviceLogs()
  expect(status).toEqual(DeviceResponseStatus.Error)
  expect(data).toEqual(undefined)
})

test("get device file returns error properly", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: DeviceResponseStatus.Error,
        }
      },
    }
  })
  const purePhoneAdapter = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { status } = await purePhoneAdapter.getDeviceLogs()
  expect(status).toEqual(DeviceResponseStatus.Error)
})
