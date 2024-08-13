/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceCommunicationError, Endpoint, Method } from "core-device/models"
import { RetrieveFilesCommand } from "Core/device-file-system/commands/retrieve-files.command"
import { DeviceProtocol } from "device-protocol/feature"
import { AppError } from "Core/core/errors"
import { Result, ResultObject } from "Core/core/builder"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"
import { DeviceFileSystemError } from "Core/device-file-system/constants"

const deviceProtocol = {
  device: {
    request: jest.fn(),
  },
  request: jest.fn(),
} as unknown as DeviceProtocol

const subject = new RetrieveFilesCommand(deviceProtocol)

const responseData: Record<string, string[]> = {
  ["/test/directory"]: [
    "/test/directory/file-1.txt",
    "/test/directory/file-2.txt",
    "/test/directory/file-3.txt",
  ],
}

const successResponse: ResultObject<Record<string, string[]>> =
  Result.success(responseData)

const failedResponse: ResultObject<Record<string, string[]>> = Result.failed(
  new AppError(DeviceCommunicationError.RequestFailed, "Something went wrong", {
    data: undefined,
    status: RequestResponseStatus.Error,
    error: {
      message: "Something went wrong",
    },
  })
)

beforeEach(() => {
  jest.resetAllMocks()
})

describe("When `DeviceManager.device.request` returns success response", () => {
  beforeEach(() => {
    deviceProtocol.request = jest.fn().mockResolvedValueOnce(successResponse)
  })

  test("returns `ResultObject.success` with payload", async () => {
    const result = await subject.exec("/test/directory")

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceProtocol.request).toHaveBeenCalledWith(undefined, {
      endpoint: Endpoint.FileSystem,
      method: Method.Get,
      body: {
        listDir: "/test/directory",
      },
    })
    expect(result).toEqual(Result.success(responseData))
  })
})

describe("When `DeviceManager.device.request` returns failed response", () => {
  beforeEach(() => {
    deviceProtocol.request = jest.fn().mockResolvedValueOnce(failedResponse)
  })

  test("returns `ResultObject.failed` with payload", async () => {
    const result = await subject.exec("/test/directory")

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceProtocol.request).toHaveBeenCalledWith(undefined, {
      endpoint: Endpoint.FileSystem,
      method: Method.Get,
      body: {
        listDir: "/test/directory",
      },
    })
    expect(result).toEqual(
      Result.failed(
        new AppError(
          DeviceFileSystemError.FilesRetrieve,
          "Something went wrong"
        )
      )
    )
  })
})
