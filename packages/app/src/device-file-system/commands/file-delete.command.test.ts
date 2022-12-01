/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "App/device/constants"
import DeviceService from "App/__deprecated__/backend/device-service"
import { SuccessResult } from "App/core/builder"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { FileDeleteCommand } from "App/device-file-system/commands/file-delete.command"

const deviceService = {
  request: jest.fn(),
} as unknown as DeviceService

const subject = new FileDeleteCommand(deviceService)

const successResponse: RequestResponse = {
  status: RequestResponseStatus.Ok,
}

const failedResponse: RequestResponse<undefined> = {
  status: RequestResponseStatus.Error,
  error: {
    message: "Something went wrong",
  },
  data: undefined,
}

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`FileDeleteCommand`", () => {
  describe("when `DeviceService.request` returns success response", () => {
    beforeEach(() => {
      deviceService.request = jest.fn().mockResolvedValue(successResponse)
    })

    test("returns `ResultObject.success`", async () => {
      const result = await subject.exec("/usr/local/file-1.txt")

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.request).toHaveBeenCalledWith({
        endpoint: Endpoint.FileSystem,
        method: Method.Delete,
        body: {
          removeFile: "/usr/local/file-1.txt",
        },
      })
      expect(result).toEqual(new SuccessResult(undefined))
    })
  })

  describe("when `DeviceService.request` returns failed response", () => {
    beforeEach(() => {
      deviceService.request = jest.fn().mockResolvedValue(failedResponse)
    })

    test("returns `ResultObject.failed`", async () => {
      const result = await subject.exec("/usr/local/file-1.txt")

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.request).toHaveBeenCalledWith({
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
