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
import { ThreadRepository } from "../repositories"
import { Thread } from "App/messages/reducers/messages.interface"

jest.mock("App/messages/presenters")
;(ThreadPresenter as unknown as jest.Mock).mockImplementation(() => {
  return {
    mapToThread: jest.fn(),
  }
})

const deviceService = {
  request: jest.fn(),
} as unknown as DeviceService

const threadRepository = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as unknown as ThreadRepository

const subject = new ThreadService(deviceService, threadRepository)

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

const successResponse: SuccessRequestResponse<any> = {
  status: RequestResponseStatus.Ok,
  data: pureThread,
}

const errorResponse: ErrorRequestResponse = {
  status: RequestResponseStatus.Error,
}

const thread: Thread = {
  id: "1",
  phoneNumber: "+48 755 853 216",
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
}

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`ThreadService`", () => {
  describe("`getThread` method", () => {
    // test skipped until os part will be implemented CP-1232
    test.skip("map data and returns success when `deviceService.request` returns success", async () => {
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
      const response = await subject.getThreads({ limit: 1, offset: 0 })
      expect(deviceService.request).toHaveBeenCalled()
      expect(ThreadPresenter.mapToThread).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error when `deviceService.request` returns error", async () => {
      deviceService.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.getThreads({ limit: 1, offset: 0 })
      expect(deviceService.request).toHaveBeenCalled()
      expect(ThreadPresenter.mapToThread).not.toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("`deleteThreads` method", () => {
    test("map data and returns success when `deviceService.request` returns success", async () => {
      deviceService.request = jest.fn().mockReturnValue({
        status: RequestResponseStatus.Ok,
        id: "1",
      })
      const response = await subject.deleteThreads(["1"])
      expect(deviceService.request).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error when `deviceService.request` returns error", async () => {
      deviceService.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.deleteThreads(["1"])
      expect(deviceService.request).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("`toggleThreadReadStatus` method", () => {
    test("map data and returns success when `deviceService.request` returns success", async () => {
      deviceService.request = jest.fn().mockReturnValue({
        status: RequestResponseStatus.Ok,
        thread: [thread],
      })
      const response = await subject.toggleThreadReadStatus([thread])
      expect(deviceService.request).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error when `deviceService.request` returns error", async () => {
      deviceService.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.toggleThreadReadStatus([thread])
      expect(deviceService.request).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })
})
