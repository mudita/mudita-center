/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceService } from "App/__deprecated__/backend/device-service"
import { SuccessResult, FailedResult } from "App/core/builder"
import { AppError } from "App/core/errors"
import { DeviceDirectory } from "App/files-manager/constants"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { FilesManagerError } from "App/files-manager/constants"
import { FileManagerService } from "App/files-manager/services/file-manager.service"

const deviceService = {
  request: jest.fn(),
} as unknown as DeviceService

const subject = new FileManagerService(deviceService)

describe("When device return list of files with `Ok` status code", () => {
  test("returns result with serialized files", async () => {
    deviceService.request = jest.fn().mockResolvedValueOnce({
      data: {
        [DeviceDirectory.Music]: [
          { path: "/test/file-1.mp3", fileSize: 654321 },
        ],
      },
      status: RequestResponseStatus.Ok,
      error: undefined,
    })

    const result = await subject.getDeviceFiles(DeviceDirectory.Music)

    expect(result).toEqual(
      new SuccessResult([
        {
          name: "file-1.mp3",
          type: "mp3",
          id: "/test/file-1.mp3",
          size: 654321,
        },
      ])
    )
  })
})

describe("When device return list of files with filed status code", () => {
  test("returns result with default error", async () => {
    deviceService.request = jest.fn().mockResolvedValueOnce({
      data: {
        [DeviceDirectory.Music]: [{ path: "/test/file-1.mp3" }],
      },
      status: RequestResponseStatus.Error,
      error: undefined,
    })

    const result = await subject.getDeviceFiles(DeviceDirectory.Music)

    expect(result).toEqual(
      new FailedResult({
        ...new AppError(FilesManagerError.GetFiles, "Something went wrong"),
      })
    )
  })
})

describe("When device return error response", () => {
  test("returns result with error", async () => {
    deviceService.request = jest.fn().mockResolvedValueOnce({
      data: undefined,
      status: RequestResponseStatus.Error,
      error: {
        message: "Luke, I'm your error",
      },
    })

    const result = await subject.getDeviceFiles(DeviceDirectory.Music)

    expect(result).toEqual(
      new FailedResult({
        ...new AppError(FilesManagerError.GetFiles, "Luke, I'm your error"),
      })
    )
  })
})
