/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as fs from "fs"
import path from "path"
import { ipcMain } from "electron-better-ipc"
import DeviceService from "Backend/device-service"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"
import MuditaDeviceManager, { GetFileListResponseBody } from "@mudita/pure"
import DeviceFileSystemService from "Backend/device-file-system-service/device-file-system-service"

jest.mock("Backend/device-service")
jest.mock("Backend/device-file-system-service/device-file-system-service")

test("Unlock device returns properly value", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: DeviceResponseStatus.Ok,
        }
      },
    }
  })
  const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
  const deviceFileSystemService = new DeviceFileSystemService(deviceService)

  const purePhoneAdapter = createPurePhoneAdapter(
    deviceService,
    deviceFileSystemService
  )
  const { status } = await purePhoneAdapter.unlockDevice("3333")
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("Get unlock device status returns properly value", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: DeviceResponseStatus.Ok,
        }
      },
    }
  })
  const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
  const deviceFileSystemService = new DeviceFileSystemService(deviceService)

  const purePhoneAdapter = createPurePhoneAdapter(
    deviceService,
    deviceFileSystemService
  )
  const { status } = await purePhoneAdapter.getUnlockDeviceStatus()
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

describe("getDeviceLogFiles method", () => {
  const text1kb = fs
    .readFileSync(require.resolve(path.join(__dirname, "./1kb.txt")))
    .toString()

  const firstFileName = "MuditaOS.log"
  const firstFilePath = `/sys/user/logs/${firstFileName}`
  const secondFileName = "NoMimeType"
  const secondFilePath = `/sys/user/logs/${secondFileName}`

  const returnMockGetFileListResponse = (
    files: string[]
  ): DeviceResponse<GetFileListResponseBody> => {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        files,
      },
    }
  }

  describe("when 1 log file is fetched successful", () => {
    ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
      return {
        request: () => {
          return returnMockGetFileListResponse([firstFilePath])
        },
      }
    })
    ;(DeviceFileSystemService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          downloadFile: () => {
            return {
              status: DeviceResponseStatus.Ok,
              data: text1kb,
            }
          },
        }
      }
    )
    const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
    const deviceFileSystemService = new DeviceFileSystemService(deviceService)

    const purePhoneAdapter = createPurePhoneAdapter(
      deviceService,
      deviceFileSystemService
    )

    test("should return DeviceResponseStatus.Ok as status", async () => {
      const { status } = await purePhoneAdapter.getDeviceLogFiles()
      expect(status).toEqual(DeviceResponseStatus.Ok)
    })

    test("should return properly list length", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles()
      expect(data).toHaveLength(1)
    })

    test("items of the list should is the File type", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles()
      // A File object is a Blob object with a name attribute, which is a string;
      expect(typeof data[0].name).toEqual("string")
    })

    test("files of the list should has properly set name", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles()
      expect(data[0].name).toEqual(firstFileName)
    })

    test("should return properly chunked File List", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles(500)
      expect(data).toHaveLength(2)
    })

    test("files of the chunked File List should have properly set name", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles(500)
      expect(data[0].name).toEqual("MuditaOS-part1.log")
      expect(data[1].name).toEqual("MuditaOS-part2.log")
    })
  })

  describe("when 2 log files are fetched successful", () => {
    ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
      return {
        request: () => {
          return returnMockGetFileListResponse([
            firstFilePath,
            secondFilePath,
          ])
        },
      }
    })
    ;(DeviceFileSystemService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          downloadFile: () => {
            return {
              status: DeviceResponseStatus.Ok,
              data: text1kb,
            }
          },
        }
      }
    )
    const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
    const deviceFileSystemService = new DeviceFileSystemService(deviceService)

    const purePhoneAdapter = createPurePhoneAdapter(
      deviceService,
      deviceFileSystemService
    )

    test("should return DeviceResponseStatus.Ok as status", async () => {
      const { status } = await purePhoneAdapter.getDeviceLogFiles()
      expect(status).toEqual(DeviceResponseStatus.Ok)
    })

    test("should return properly list length", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles()
      expect(data).toHaveLength(2)
    })

    test("should return properly chunked File List", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles(500)
      expect(data).toHaveLength(4)
    })

    test("files of the chunked File List should have properly set name", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles(500)
      expect(data[0].name).toEqual("MuditaOS-part1.log")
      expect(data[1].name).toEqual("MuditaOS-part2.log")
      expect(data[3].name).toEqual("NoMimeType-part1")
      expect(data[4].name).toEqual("NoMimeType-part2")
    })
  })

  describe("when DeviceInfo API request throw error", () => {
    ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
      return {
        request: () => {
          return {
            status: DeviceResponseStatus.Error,
          }
        },
      }
    })
    const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
    const deviceFileSystemService = new DeviceFileSystemService(deviceService)

    const purePhoneAdapter = createPurePhoneAdapter(
      deviceService,
      deviceFileSystemService
    )

    test("should return DeviceResponseStatus.Error as status", async () => {
      const { status } = await purePhoneAdapter.getDeviceLogFiles()
      expect(status).toEqual(DeviceResponseStatus.Error)
    })
  })

  describe("when File system API request throw error", () => {
    ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
      return {
        request: () => {
          return returnMockGetFileListResponse([firstFilePath])
        },
      }
    })
    ;(DeviceFileSystemService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          downloadFile: () => {
            return {
              status: DeviceResponseStatus.Error,
            }
          },
        }
      }
    )
    const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
    const deviceFileSystemService = new DeviceFileSystemService(deviceService)

    const purePhoneAdapter = createPurePhoneAdapter(
      deviceService,
      deviceFileSystemService
    )

    test("should return DeviceResponseStatus.Error as status", async () => {
      const { status } = await purePhoneAdapter.getDeviceLogFiles()
      expect(status).toEqual(DeviceResponseStatus.Error)
    })
  })
})
