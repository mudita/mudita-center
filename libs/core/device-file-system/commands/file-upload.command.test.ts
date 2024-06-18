/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import path from "path"
import mock from "mock-fs"
import { DeviceCommunicationError, Endpoint, Method } from "core-device/models"
import { FileUploadCommand } from "Core/device-file-system/commands/file-upload.command"
import { DeviceProtocolService } from "device-protocol/feature"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { AppError } from "Core/core/errors"
import { Result, ResultObject } from "Core/core/builder"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"
import { DeviceFileSystemError } from "Core/device-file-system/constants"

const deviceProtocolService = {
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceProtocolService

const fileSystemService = {
  readFile: jest.fn(),
  getFileSize: jest.fn(),
} as unknown as FileSystemService

const subject = new FileUploadCommand(deviceProtocolService, fileSystemService)

const successResponse: ResultObject<{
  txID: string
  chunkSize: number
}> = Result.success({
  txID: "123",
  chunkSize: 2,
})

const failedResponse: ResultObject<unknown> = Result.failed(
  new AppError(DeviceCommunicationError.RequestFailed, "Something went wrong", {
    status: RequestResponseStatus.Error,
    error: {
      message: "Something went wrong",
    },
    data: undefined,
  })
)

const failedResponseWithInsufficientStorage: ResultObject<unknown> =
  Result.failed(
    new AppError(
      DeviceCommunicationError.RequestFailed,
      "Something went wrong",
      {
        status: RequestResponseStatus.InsufficientStorage,
        error: undefined,
        data: undefined,
      }
    )
  )

beforeEach(() => {
  jest.resetAllMocks()
})

describe("When requested file is unreadable", () => {
  beforeAll(() => {
    mock(
      {
        "test.txt": "Hello World!\n",
      },
      { createCwd: false, createTmp: false }
    )
  })

  afterAll(() => {
    mock.restore()
  })

  test("returns `ResultObject.failed` with error description and path of filed file", async () => {
    fileSystemService.readFile = jest
      .fn()
      .mockRejectedValueOnce(new Error("ERR_UNKNOWN_FILE_EXTENSION"))
    const result = await subject.exec(
      "/test/directory",
      "/usr/local/file-1.txt"
    )

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceProtocolService.device.request).not.toHaveBeenCalled()
    expect(result).toEqual(
      Result.failed(
        new AppError(
          DeviceFileSystemError.FileUploadUnreadable,
          "Uploading file: file /usr/local/file-1.txt can't be opened"
        )
      )
    )
  })
})

describe("When requested file is valid", () => {
  beforeAll(() => {
    mock(
      {
        "test.txt": "Hello World!\n",
      },
      { createCwd: false, createTmp: false }
    )
  })
  afterAll(() => {
    mock.restore()
  })
  beforeEach(() => {
    const fileMock = fs.readFileSync(path.join(process.cwd(), "test.txt"))
    fileSystemService.readFile = jest.fn().mockReturnValue(fileMock)
  })

  describe("when `DeviceManager.device.request` returns success response", () => {
    beforeAll(() => {
      mock(
        {
          "test.txt": "Hello World!\n",
        },
        { createCwd: false, createTmp: false }
      )
    })
    afterAll(() => {
      mock.restore()
    })
    beforeEach(() => {
      deviceProtocolService.device.request = jest
        .fn()
        .mockResolvedValue(successResponse)
    })

    test("returns `ResultObject.success`", async () => {
      const result = await subject.exec(
        "/test/directory",
        "/usr/local/file-1.txt"
      )

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceProtocolService.device.request).toHaveBeenCalledWith({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          fileSize: 13,
          fileCrc32: "7d14dddd",
          fileName: "/test/directory/file-1.txt",
        },
      })
      expect(result).toEqual(Result.success(undefined))
    })
  })

  describe("when `DeviceManager.device.request` returns failed response on first request", () => {
    beforeAll(() => {
      mock(
        {
          "test.txt": "Hello World!\n",
        },
        { createCwd: false, createTmp: false }
      )
    })
    afterAll(() => {
      mock.restore()
    })
    beforeEach(() => {
      deviceProtocolService.device.request = jest
        .fn()
        .mockResolvedValue(failedResponse)
    })

    test("returns `ResultObject.failed` with `DeviceFileSystemError.FileUploadRequest` type", async () => {
      const result = await subject.exec(
        "/test/directory",
        "/usr/local/file-1.txt"
      )

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceProtocolService.device.request).toHaveBeenCalledWith({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          fileSize: 13,
          fileCrc32: "7d14dddd",
          fileName: "/test/directory/file-1.txt",
        },
      })
      expect(result).toEqual(
        Result.failed(
          new AppError(
            DeviceFileSystemError.FileUploadRequest,
            "Uploading file: Something went wrong in init sending request"
          )
        )
      )
    })
  })

  describe("when `DeviceManager.device.request` returns failed response on the next requests", () => {
    beforeAll(() => {
      mock(
        {
          "test.txt": "Hello World!\n",
        },
        { createCwd: false, createTmp: false }
      )
    })
    afterAll(() => {
      mock.restore()
    })
    beforeEach(() => {
      deviceProtocolService.device.request = jest
        .fn()
        .mockImplementation(({ body }) => {
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { chunkNo } = body

          if (chunkNo === 2) {
            return failedResponse
          } else {
            return successResponse
          }
        })
    })

    test("returns `ResultObject.success` with DeviceFileSystemError.FileUploadChunk type", async () => {
      const result = await subject.exec(
        "/test/directory",
        "/usr/local/file-1.txt"
      )

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceProtocolService.device.request).toHaveBeenCalledWith({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          fileSize: 13,
          fileCrc32: "7d14dddd",
          fileName: "/test/directory/file-1.txt",
        },
      })
      expect(result).toEqual(
        Result.failed(
          new AppError(
            DeviceFileSystemError.FileUploadChunk,
            "Uploading file: Something went wrong in sent chunk file"
          )
        )
      )
    })
  })

  describe("when `DeviceManager.device.request` returns failed response with `RequestResponseStatus.InsufficientStorage` status", () => {
    beforeAll(() => {
      mock(
        {
          "test.txt": "Hello World!\n",
        },
        { createCwd: false, createTmp: false }
      )
    })
    afterAll(() => {
      mock.restore()
    })
    beforeEach(() => {
      deviceProtocolService.device.request = jest
        .fn()
        .mockResolvedValue(failedResponseWithInsufficientStorage)
    })

    test("returns `ResultObject.failed` with `DeviceFileSystemError.NoSpaceLeft` error type", async () => {
      const result = await subject.exec(
        "/test/directory",
        "/usr/local/file-1.txt"
      )

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceProtocolService.device.request).toHaveBeenCalledWith({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          fileSize: 13,
          fileCrc32: "7d14dddd",
          fileName: "/test/directory/file-1.txt",
        },
      })
      expect(result).toEqual(
        Result.failed(
          new AppError(
            DeviceFileSystemError.NoSpaceLeft,
            "Not enough space on device"
          )
        )
      )
    })
  })
})
