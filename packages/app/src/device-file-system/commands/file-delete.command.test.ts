/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Endpoint,
  Method,
  DeviceCommunicationError,
} from "App/device/constants"
import { DeviceManager } from "App/device-manager/services"
import { AppError } from "App/core/errors"
import { Result, ResultObject, SuccessResult } from "App/core/builder"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { FileDeleteCommand } from "App/device-file-system/commands/file-delete.command"

const deviceManager = {
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceManager

const subject = new FileDeleteCommand(deviceManager)

const successResponse: ResultObject<unknown> = Result.success(undefined)

const failedResponse: ResultObject<undefined> = Result.failed(
  new AppError(DeviceCommunicationError.RequestFailed, "Something went wrong", {
    status: RequestResponseStatus.Error,
    error: {
      message: "Something went wrong",
    },
    data: undefined,
  })
)

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`FileDeleteCommand`", () => {
  describe("when `DeviceManager.device.request` returns success response", () => {
    beforeEach(() => {
      deviceManager.device.request = jest
        .fn()
        .mockResolvedValue(successResponse)
    })

    test("returns `ResultObject.success`", async () => {
      const result = await subject.exec("/usr/local/file-1.txt")

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalledWith({
        endpoint: Endpoint.FileSystem,
        method: Method.Delete,
        body: {
          removeFile: "/usr/local/file-1.txt",
        },
      })
      expect(result).toEqual(new SuccessResult("/usr/local/file-1.txt"))
    })
  })

  describe("when `DeviceManager.device.request` returns failed response", () => {
    beforeEach(() => {
      deviceManager.device.request = jest.fn().mockResolvedValue(failedResponse)
    })

    test("returns `ResultObject.failed`", async () => {
      const result = await subject.exec("/usr/local/file-1.txt")

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalledWith({
        endpoint: Endpoint.FileSystem,
        method: Method.Delete,
        body: {
          removeFile: "/usr/local/file-1.txt",
        },
      })
      expect(result).toMatchInlineSnapshot(`
        FailedResult {
          "data": undefined,
          "error": Object {
            "message": "Something went wrong",
            "payload": undefined,
            "type": "DEVICE_FILE_DELETE_ERROR",
          },
          "ok": false,
        }
      `)
    })
  })
})
