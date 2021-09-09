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
import MuditaDeviceManager from "@mudita/pure"
import MockDate from "mockdate"
import DeviceFileSystemService from "Backend/device-file-system-service/device-file-system-service"
import DeviceFileDiagnosticService from "Backend/device-file-diagnostic-service/device-file-diagnostic-service"

jest.mock("Backend/device-service")
jest.mock("Backend/device-file-system-service/device-file-system-service")
jest.mock(
  "Backend/device-file-diagnostic-service/device-file-diagnostic-service"
)

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
  const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
    deviceService
  )

  const purePhoneAdapter = createPurePhoneAdapter(
    deviceService,
    deviceFileSystemService,
    deviceFileDiagnosticService
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
  const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
    deviceService
  )

  const purePhoneAdapter = createPurePhoneAdapter(
    deviceService,
    deviceFileSystemService,
    deviceFileDiagnosticService
  )
  const { status } = await purePhoneAdapter.getUnlockDeviceStatus()
  expect(status).toEqual(DeviceResponseStatus.Ok)
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
  ): DeviceResponse<string[]> => {
    return {
      status: DeviceResponseStatus.Ok,
      data: files,
    }
  }

  describe("when 1 log file is fetched successful", () => {
    ;(DeviceFileDiagnosticService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          getAllDiagnosticFileList: () => {
            return returnMockGetFileListResponse([firstFilePath])
          },
        }
      }
    )
    ;(DeviceFileSystemService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          downloadDeviceFiles: () => {
            return {
              status: DeviceResponseStatus.Ok,
              data: [
                {
                  data: text1kb,
                  name: firstFileName,
                },
              ],
            }
          },
        }
      }
    )
    const deviceFileSystemService = new DeviceFileSystemService(deviceService)
    const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
      deviceService
    )

    const purePhoneAdapter = createPurePhoneAdapter(
      deviceService,
      deviceFileSystemService,
      deviceFileDiagnosticService
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

    test("should return properly date prefix", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles({
        datePrefix: true,
      })
      expect(data[0].name).toEqual("2000-02-01-MuditaOS.log")
    })

    test("should return properly chunked File List", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles({
        maxBytes: 500,
      })
      expect(data).toHaveLength(2)
    })

    test("files of the chunked File List should have properly set name", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles({
        maxBytes: 500,
      })
      expect(data[0].name).toEqual("MuditaOS-part1.log")
      expect(data[1].name).toEqual("MuditaOS-part2.log")
    })

    test("files of the chunked File List should have properly set name and date prefix", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles({
        maxBytes: 500,
        datePrefix: true,
      })
      expect(data[0].name).toEqual("2000-02-01-MuditaOS-part1.log")
      expect(data[1].name).toEqual("2000-02-01-MuditaOS-part2.log")
    })
  })

  describe("when 2 log files are fetched successful", () => {
    ;(DeviceFileDiagnosticService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          getAllDiagnosticFileList: () => {
            return returnMockGetFileListResponse([
              firstFilePath,
              secondFilePath,
            ])
          },
        }
      }
    )
    ;(DeviceFileSystemService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          downloadDeviceFiles: () => {
            return {
              status: DeviceResponseStatus.Ok,
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
      }
    )
    const deviceFileSystemService = new DeviceFileSystemService(deviceService)
    const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
      deviceService
    )

    const purePhoneAdapter = createPurePhoneAdapter(
      deviceService,
      deviceFileSystemService,
      deviceFileDiagnosticService
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
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles({
        maxBytes: 500,
      })
      expect(data).toHaveLength(4)
    })

    test("files of the chunked File List should have properly set name", async () => {
      const { data = [] } = await purePhoneAdapter.getDeviceLogFiles({
        maxBytes: 500,
      })
      expect(data[0].name).toEqual("MuditaOS-part1.log")
      expect(data[1].name).toEqual("MuditaOS-part2.log")
      expect(data[2].name).toEqual("NoMimeType-part1")
      expect(data[3].name).toEqual("NoMimeType-part2")
    })
  })

  describe("when getAllDiagnosticFileList throw error", () => {
    ;(DeviceFileDiagnosticService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          getAllDiagnosticFileList: () => {
            return {
              status: DeviceResponseStatus.Error,
            }
          },
        }
      }
    )
    const deviceFileSystemService = new DeviceFileSystemService(deviceService)
    const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
      deviceService
    )

    const purePhoneAdapter = createPurePhoneAdapter(
      deviceService,
      deviceFileSystemService,
      deviceFileDiagnosticService
    )

    test("should return DeviceResponseStatus.Error as status", async () => {
      const { status } = await purePhoneAdapter.getDeviceLogFiles()
      expect(status).toEqual(DeviceResponseStatus.Error)
    })
  })

  describe("when downloadFiles throw error", () => {
    ;(DeviceFileDiagnosticService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          getAllDiagnosticFileList: () => {
            return returnMockGetFileListResponse([firstFilePath])
          },
        }
      }
    )
    ;(DeviceFileSystemService as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          downloadDeviceFiles: () => {
            return {
              status: DeviceResponseStatus.Error,
            }
          },
        }
      }
    )
    const deviceFileSystemService = new DeviceFileSystemService(deviceService)
    const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
      deviceService
    )

    const purePhoneAdapter = createPurePhoneAdapter(
      deviceService,
      deviceFileSystemService,
      deviceFileDiagnosticService
    )

    test("should return DeviceResponseStatus.Error as status", async () => {
      const { status } = await purePhoneAdapter.getDeviceLogFiles()
      expect(status).toEqual(DeviceResponseStatus.Error)
    })
  })
})
