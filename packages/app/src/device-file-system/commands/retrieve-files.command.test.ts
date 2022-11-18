/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "App/device/constants"
import { RetrieveFilesCommand } from "App/device-file-system/commands/retrieve-files.command"
import DeviceService from "App/__deprecated__/backend/device-service"
import { AppError } from "App/core/errors"
import { Result } from "App/core/builder"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { DeviceFileSystemError } from "App/device-file-system/constants"

const deviceService = {
  request: jest.fn(),
} as unknown as DeviceService

const subject = new RetrieveFilesCommand(deviceService)

const responseData: Record<string, string[]> = {
  ["/test/directory"]: [
    "/test/directory/file-1.txt",
    "/test/directory/file-2.txt",
    "/test/directory/file-3.txt",
  ],
}

const successResponse: RequestResponse<Record<string, string[]>> = {
  data: responseData,
  status: RequestResponseStatus.Ok,
  error: undefined,
}

const failedResponse: RequestResponse<Record<string, string[]>> = {
  data: undefined,
  status: RequestResponseStatus.Error,
  error: {
    message: "Something went wrong",
  },
}

beforeEach(() => {
  jest.resetAllMocks()
})

describe("When `DeviceService.request` returns success response", () => {
  beforeEach(() => {
    deviceService.request = jest.fn().mockResolvedValueOnce(successResponse)
  })

  test("returns `ResultObject.success` with payload", async () => {
    const result = await subject.exec("/test/directory")

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceService.request).toHaveBeenCalledWith({
      endpoint: Endpoint.FileSystem,
      method: Method.Get,
      body: {
        listDir: "/test/directory",
      },
    })
    expect(result).toEqual(Result.success(responseData))
  })
})

describe("When `DeviceService.request` returns failed response", () => {
  beforeEach(() => {
    deviceService.request = jest.fn().mockResolvedValueOnce(failedResponse)
  })

  test("returns `ResultObject.failed` with payload", async () => {
    const result = await subject.exec("/test/directory")

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceService.request).toHaveBeenCalledWith({
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
