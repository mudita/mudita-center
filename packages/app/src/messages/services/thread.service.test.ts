/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */


import { Thread as PureThread } from "@mudita/pure"
import {
  ErrorRequestResponse,
  RequestResponseStatus,
  SuccessRequestResponse,
} from "App/core/types/request-response.interface"
import { ThreadService } from "App/messages/services/thread.service"
import DeviceService from "Backend/device-service"
import { ThreadPresenter } from "App/messages/presenters"

jest.mock("App/messages/presenters")
;(ThreadPresenter as unknown as jest.Mock).mockImplementation(() => {
  return {
    mapToThread: jest.fn(),
  }
})

const deviceService = {
  request: jest.fn(),
} as unknown as DeviceService

const subject = new ThreadService(deviceService)

const successResponse: SuccessRequestResponse<any> = {
  status: RequestResponseStatus.Ok,
  data: {},
}

const errorResponse: ErrorRequestResponse = {
  status: RequestResponseStatus.Error,
}

const pureThread: PureThread = {
  contactID: 1,
  isUnread: true,
  lastUpdatedAt: 1617089558,
  messageCount: 1,
  messageSnippet:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  messageType: 1,
  number: "+48500600700",
  threadID: 1,
}

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`ThreadService`", () => {
  describe("`getThread` method", () => {
    test("map data and returns success when `deviceService.request` returns success", async () => {
      deviceService.request = jest.fn().mockReturnValue(successResponse)
      const response = await subject.getThread("1")
      expect(deviceService.request).toHaveBeenCalled()
      expect(ThreadPresenter.mapToThread).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error  when `deviceService.request` returns error", async () => {
      deviceService.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.getThread("1")
      expect(deviceService.request).toHaveBeenCalled()
      expect(ThreadPresenter.mapToThread).not.toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("`getThreads` method", () => {
    test("map data and returns success when `deviceService.request` returns success", async () => {
      deviceService.request = jest.fn().mockReturnValue({
        ...successResponse,
        data: { entries: [pureThread] },
      })
      const response = await subject.getThreads({limit: 1, offset:0})
      expect(deviceService.request).toHaveBeenCalled()
      expect(ThreadPresenter.mapToThread).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error when `deviceService.request` returns error", async () => {
      deviceService.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.getThreads({limit: 1, offset:0})
      expect(deviceService.request).toHaveBeenCalled()
      expect(ThreadPresenter.mapToThread).not.toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })
})
