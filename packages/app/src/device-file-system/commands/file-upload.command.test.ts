/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import path from "path"
import {
  Endpoint,
  Method,
  DeviceCommunicationError,
} from "App/device/constants"
import { FileUploadCommand } from "App/device-file-system/commands/file-upload.command"
import { DeviceManager } from "App/device-manager/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AppError } from "App/core/errors"
import { Result, ResultObject } from "App/core/builder"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { DeviceFileSystemError } from "App/device-file-system/constants"

const fileMock = fs.readFileSync(
  path.join(__dirname, "../../testing-support/mocks/test.txt")
)

const deviceManager = {
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceManager

const fileSystemService = {
  readFile: jest.fn(),
} as unknown as FileSystemService

const subject = new FileUploadCommand(deviceManager, fileSystemService)

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
  beforeEach(() => {
    fileSystemService.readFile = jest
      .fn()
      .mockRejectedValueOnce(new Error("ERR_UNKNOWN_FILE_EXTENSION"))
  })

  test("returns `ResultObject.failed` with error description and path of filed file", async () => {
    const result = await subject.exec(
      "/test/directory",
      "/usr/local/file-1.txt"
    )

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).not.toHaveBeenCalled()
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
  beforeEach(() => {
    fileSystemService.readFile = jest.fn().mockReturnValue(fileMock)
  })

  describe("when `DeviceManager.device.request` returns success response", () => {
    beforeEach(() => {
      deviceManager.device.request = jest
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
      expect(deviceManager.device.request).toHaveBeenCalledWith({
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
    beforeEach(() => {
      deviceManager.device.request = jest.fn().mockResolvedValue(failedResponse)
    })

    test("returns `ResultObject.failed` with `DeviceFileSystemError.FileUploadRequest` type", async () => {
      const result = await subject.exec(
        "/test/directory",
        "/usr/local/file-1.txt"
      )

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalledWith({
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
    beforeEach(() => {
      deviceManager.device.request = jest
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
      expect(deviceManager.device.request).toHaveBeenCalledWith({
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
    beforeEach(() => {
      deviceManager.device.request = jest
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
      expect(deviceManager.device.request).toHaveBeenCalledWith({
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
