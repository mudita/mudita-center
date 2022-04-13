/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as fs from "fs"
import path from "path"
import { ipcMain } from "electron-better-ipc"
import MuditaDeviceManager from "@mudita/pure"
import DeviceService from "Backend/device-service"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"
import MockDate from "mockdate"
import DeviceFileDiagnosticService from "Backend/device-file-diagnostic-service/device-file-diagnostic-service"
import { DeviceFileSystem } from "Backend/adapters/device-file-system/device-file-system.adapter"
import { DeviceBaseInfo } from "Backend/adapters/device-base-info/device-base-info.adapter"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

jest.mock("Backend/device-service")
jest.mock("Backend/adapters/device-base-info/device-base-info.adapter")
jest.mock("Backend/adapters/device-file-system/device-file-system.adapter")
jest.mock(
  "Backend/device-file-diagnostic-service/device-file-diagnostic-service"
)

test("Unlock device returns properly value", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: RequestResponseStatus.Ok,
        }
      },
    }
  })
  const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
  const deviceFileSystem = new DeviceFileSystem(deviceService)
  const deviceBaseInfo = new DeviceBaseInfo(deviceService)
  const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
    deviceService
  )

  const purePhoneAdapter = createPurePhoneAdapter(
    deviceService,
    deviceBaseInfo,
    deviceFileSystem,
    deviceFileDiagnosticService
  )
  const { status } = await purePhoneAdapter.unlockDevice("3333")
  expect(status).toEqual(RequestResponseStatus.Ok)
})

test("Get unlock device status returns properly value", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: RequestResponseStatus.Ok,
        }
      },
    }
  })
  const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
  const deviceFileSystem = new DeviceFileSystem(deviceService)
  const deviceBaseInfo = new DeviceBaseInfo(deviceService)
  const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
    deviceService
  )

  const purePhoneAdapter = createPurePhoneAdapter(
    deviceService,
    deviceBaseInfo,
    deviceFileSystem,
    deviceFileDiagnosticService
  )
  const { status } = await purePhoneAdapter.getUnlockDeviceStatus()
  expect(status).toEqual(RequestResponseStatus.Ok)
})

describe("getDeviceLogFiles method", () => {
  MockDate.set("2000-2-1")
  const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
  const text1kb = fs
    .readFileSync(require.resolve(path.join(__dirname, "./1kb.txt")))
    .toString()

  const firstFileName = "MuditaOS.log"
  const firstFilePath = `/sys/user/logs/${firstFileName}`
  const secondFileName = "NoMimeType"
  const secondFilePath = `/sys/user/logs/${secondFileName}`

  const returnMockGetFileListResponse = (
    files: string[]
  ): RequestResponse<{ files: string[] }> => {
    return {
      status: RequestResponseStatus.Ok,
      data: {
        files,
      },
    }
  }

  describe("when 1 log file is fetched successful", () => {
    ;(DeviceFileDiagnosticService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          getDiagnosticFileList: () => {
            return returnMockGetFileListResponse([firstFilePath])
          },
        }
      }
    )
    ;(DeviceFileSystem as unknown as jest.Mock).mockImplementation(() => {
      return {
        downloadDeviceFiles: () => {
          return {
            status: RequestResponseStatus.Ok,
            data: [
              {
                data: text1kb,
                name: firstFileName,
              },
            ],
          }
        },
      }
    })
    const deviceFileSystem = new DeviceFileSystem(deviceService)
    const deviceBaseInfo = new DeviceBaseInfo(deviceService)
    const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
      deviceService
    )

    const purePhoneAdapter = createPurePhoneAdapter(
      deviceService,
      deviceBaseInfo,
      deviceFileSystem,
      deviceFileDiagnosticService
    )

    test("should return DeviceResponseStatus.Ok as status", async () => {
      const { status } = await purePhoneAdapter.getDeviceLogFiles()
      expect(status).toEqual(RequestResponseStatus.Ok)
    })

    test("should return properly list length", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles()
      expect(data).toHaveLength(1)
    })

    test("items of the list should have the File type", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles()
      // A File object is a Blob object with a name attribute, which is a string;
      expect(typeof data[0].name).toEqual("string")
    })

    test("files of the list should has properly set name", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles()
      expect(data[0].name).toEqual(firstFileName)
    })

    test("should return properly date prefix", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles({
        datePrefix: true,
      })
      expect(data[0].name).toEqual("2000-02-01-MuditaOS.log")
    })
  })

  describe("when 2 log files are fetched successful", () => {
    ;(DeviceFileDiagnosticService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          getDiagnosticFileList: () => {
            return returnMockGetFileListResponse([
              firstFilePath,
              secondFilePath,
            ])
          },
        }
      }
    )
    ;(DeviceFileSystem as unknown as jest.Mock).mockImplementation(() => {
      return {
        downloadDeviceFiles: () => {
          return {
            status: RequestResponseStatus.Ok,
            data: [
              {
                data: text1kb,
                name: firstFileName,
              },
              {
                data: text1kb,
                name: secondFileName,
              },
            ],
          }
        },
      }
    })
    const deviceFileSystem = new DeviceFileSystem(deviceService)
    const deviceBaseInfo = new DeviceBaseInfo(deviceService)
    const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
      deviceService
    )

    const purePhoneAdapter = createPurePhoneAdapter(
      deviceService,
      deviceBaseInfo,
      deviceFileSystem,
      deviceFileDiagnosticService
    )

    test("should return DeviceResponseStatus.Ok as status", async () => {
      const { status } = await purePhoneAdapter.getDeviceLogFiles()
      expect(status).toEqual(RequestResponseStatus.Ok)
    })

    test("should return properly list length", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles()
      expect(data).toHaveLength(2)
    })
  })

  describe("when getDiagnosticFileList throw error", () => {
    ;(DeviceFileDiagnosticService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          getDiagnosticFileList: () => {
            return {
              status: RequestResponseStatus.Error,
            }
          },
        }
      }
    )
    const deviceFileSystem = new DeviceFileSystem(deviceService)
    const deviceBaseInfo = new DeviceBaseInfo(deviceService)
    const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
      deviceService
    )

    const purePhoneAdapter = createPurePhoneAdapter(
      deviceService,
      deviceBaseInfo,
      deviceFileSystem,
      deviceFileDiagnosticService
    )

    test("should return DeviceResponseStatus.Error as status", async () => {
      const { status } = await purePhoneAdapter.getDeviceLogFiles()
      expect(status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("when downloadFiles throw error", () => {
    ;(DeviceFileDiagnosticService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          getDiagnosticFileList: () => {
            return returnMockGetFileListResponse([firstFilePath])
          },
        }
      }
    )
    ;(DeviceFileSystem as unknown as jest.Mock).mockImplementation(() => {
      return {
        downloadDeviceFiles: () => {
          return {
            status: RequestResponseStatus.Error,
          }
        },
      }
    })
    const deviceFileSystem = new DeviceFileSystem(deviceService)
    const deviceBaseInfo = new DeviceBaseInfo(deviceService)
    const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
      deviceService
    )

    const purePhoneAdapter = createPurePhoneAdapter(
      deviceService,
      deviceBaseInfo,
      deviceFileSystem,
      deviceFileDiagnosticService
    )

    test("should return DeviceResponseStatus.Error as status", async () => {
      const { status } = await purePhoneAdapter.getDeviceLogFiles()
      expect(status).toEqual(RequestResponseStatus.Error)
    })
  })
})
