/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import path from "path"
import { Endpoint, Method } from "App/device/constants"
import { FileUploadCommand } from "App/device-file-system/commands/file-upload.command"
import DeviceService from "App/__deprecated__/backend/device-service"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AppError } from "App/core/errors"
import { Result, FailedResult, SuccessResult } from "App/core/builder"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { DeviceFileSystemError } from "App/device-file-system/constants"

const fileMock = fs.readFileSync(
  path.join(__dirname, "../../testing-support/mocks/test.txt")
)

const deviceService = {
  request: jest.fn(),
} as unknown as DeviceService

const fileSystemService = {
  readFile: jest.fn(),
} as unknown as FileSystemService

const subject = new FileUploadCommand(deviceService, fileSystemService)

const successResponse: RequestResponse<{
  txID: string
  chunkSize: number
}> = {
  status: RequestResponseStatus.Ok,
  error: undefined,
  data: {
    txID: "123",
    chunkSize: 2,
  },
}

const failedResponse: RequestResponse<undefined> = {
  status: RequestResponseStatus.Error,
  error: {
    message: "Something went wrong",
  },
  data: undefined,
}

const failedResponseWithInsufficientStorage: RequestResponse<undefined> = {
  status: RequestResponseStatus.InsufficientStorage,
  error: undefined,
  data: undefined,
}

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
    expect(deviceService.request).not.toHaveBeenCalled()
    expect(result).toEqual(
      new FailedResult({
        ...new AppError(
          DeviceFileSystemError.FileUploadUnreadable,
          "Uploading file: file /usr/local/file-1.txt can't be opened"
        ),
      })
    )
  })
})

describe("When requested file is valid", () => {
  beforeEach(() => {
    fileSystemService.readFile = jest.fn().mockReturnValue(fileMock)
  })

  describe("when `DeviceService.request` returns success response", () => {
    beforeEach(() => {
      deviceService.request = jest.fn().mockResolvedValue(successResponse)
    })

    test("returns `ResultObject.success`", async () => {
      const result = await subject.exec(
        "/test/directory",
        "/usr/local/file-1.txt"
      )

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.request).toHaveBeenCalledWith({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          fileSize: 13,
          fileCrc32: "7d14dddd",
          fileName: "/test/directory/file-1.txt",
        },
      })
      expect(result).toEqual(new SuccessResult(undefined))
    })
  })

  describe("when `DeviceService.request` returns failed response on first request", () => {
    beforeEach(() => {
      deviceService.request = jest.fn().mockResolvedValue(failedResponse)
    })

    test("returns `ResultObject.failed` with `DeviceFileSystemError.FileUploadRequest` type", async () => {
      const result = await subject.exec(
        "/test/directory",
        "/usr/local/file-1.txt"
      )

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.request).toHaveBeenCalledWith({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          fileSize: 13,
          fileCrc32: "7d14dddd",
          fileName: "/test/directory/file-1.txt",
        },
      })
      expect(result).toEqual(
        new FailedResult({
          ...new AppError(
            DeviceFileSystemError.FileUploadRequest,
            "Uploading file: Something went wrong in init sending request"
          ),
        })
      )
    })
  })

  describe("when `DeviceService.request` returns failed response on the next requests", () => {
    beforeEach(() => {
      deviceService.request = jest.fn().mockImplementation(({ body }) => {
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
      expect(deviceService.request).toHaveBeenCalledWith({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          fileSize: 13,
          fileCrc32: "7d14dddd",
          fileName: "/test/directory/file-1.txt",
        },
      })
      expect(result).toEqual(
        new FailedResult({
          ...new AppError(
            DeviceFileSystemError.FileUploadChunk,
            "Uploading file: Something went wrong in sent chunk file"
          ),
        })
      )
    })
  })

  describe("when `DeviceService.request` returns failed response with `RequestResponseStatus.InsufficientStorage` status", () => {
    beforeEach(() => {
      deviceService.request = jest
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
      expect(deviceService.request).toHaveBeenCalledWith({
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
