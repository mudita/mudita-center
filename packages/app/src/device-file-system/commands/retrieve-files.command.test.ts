/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Endpoint,
  Method,
  DeviceCommunicationError,
} from "App/device/constants"
import { RetrieveFilesCommand } from "App/device-file-system/commands/retrieve-files.command"
import { DeviceManager } from "App/device-manager/services"
import { AppError } from "App/core/errors"
import { Result, ResultObject } from "App/core/builder"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { DeviceFileSystemError } from "App/device-file-system/constants"

const deviceManager = {
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceManager

const subject = new RetrieveFilesCommand(deviceManager)

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
    deviceManager.device.request = jest
      .fn()
      .mockResolvedValueOnce(successResponse)
  })

  test("returns `ResultObject.success` with payload", async () => {
    const result = await subject.exec("/test/directory")

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).toHaveBeenCalledWith({
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
    deviceManager.device.request = jest
      .fn()
      .mockResolvedValueOnce(failedResponse)
  })

  test("returns `ResultObject.failed` with payload", async () => {
    const result = await subject.exec("/test/directory")

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).toHaveBeenCalledWith({
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
