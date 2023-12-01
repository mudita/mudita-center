/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject, Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { DeviceCommunicationError } from "App/device/constants"
import { Thread as PureThread } from "App/device/types/mudita-os"
import {
  RequestResponseStatus,
  SuccessRequestResponse,
} from "App/core/types/request-response.interface"
import { ThreadService } from "App/messages/services/thread.service"
import { DeviceManager } from "App/device-manager/services"
import { ThreadPresenter } from "App/messages/presenters"
import { ThreadRepository } from "App/messages/repositories"
import { Thread } from "App/messages/dto"
import { MessageType } from "App/messages/constants"

const deviceManager = {
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceManager

const threadRepository = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as unknown as ThreadRepository

const subject = new ThreadService(deviceManager, threadRepository)

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

const mappedPureThread = ThreadPresenter.mapToThread(pureThread)

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const successResponse: SuccessRequestResponse<any> = {
  status: RequestResponseStatus.Ok,
  data: pureThread,
}

const getThreadsSuccessResponse: ResultObject<{ entries: PureThread[] }> =
  Result.success({ entries: [pureThread] })
const errorResponse: ResultObject<{ entries: PureThread[] }> = Result.failed(
  new AppError(DeviceCommunicationError.RequestFailed, "Something went wrong")
)

const thread: Thread = {
  id: "1",
  phoneNumber: "+48 755 853 216",
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
  messageType: MessageType.INBOX,
  contactId: undefined,
  contactName: undefined,
}

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`ThreadService`", () => {
  describe("`getThread` method", () => {
    // test skipped until os part will be implemented CP-1232
    test.skip("map data and returns success when `deviceManager.device.request` returns success", async () => {
      deviceManager.device.request = jest.fn().mockReturnValue(successResponse)
      const response = await subject.getThread("1")
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error  when `deviceManager.device.request` returns error", async () => {
      deviceManager.device.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.getThread("1")
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalled()
      expect(response).toEqual({
        status: RequestResponseStatus.Error,
        error: {
          message: "Get thread: Something went wrong",
        },
      })
    })
  })

  describe("`getThreads` method", () => {
    test("map data and returns success when `deviceManager.device.request` returns success", async () => {
      deviceManager.device.request = jest
        .fn()
        .mockReturnValue(getThreadsSuccessResponse)
      const response = await subject.getThreads({ limit: 1, offset: 0 })
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
      expect(response.data).toMatchInlineSnapshot(`
        Object {
          "data": Array [
            Object {
              "contactId": undefined,
              "contactName": undefined,
              "id": "1",
              "lastUpdatedAt": 2021-03-30T07:32:38.000Z,
              "messageSnippet": "Draft: Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
              "messageType": "INBOX",
              "phoneNumber": "+48500600700",
              "unread": true,
            },
          ],
          "nextPage": undefined,
          "totalCount": undefined,
        }
      `)
    })

    test("returns error when `deviceManager.device.request` returns error", async () => {
      deviceManager.device.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.getThreads({ limit: 1, offset: 0 })
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalled()
      expect(response).toEqual({
        status: RequestResponseStatus.Error,
        error: {
          message: "Get threads: Something went wrong",
        },
      })
    })
  })

  describe("`deleteThreads` method", () => {
    test("map data and returns success when `deviceManager.device.request` returns success", async () => {
      deviceManager.device.request = jest
        .fn()
        .mockReturnValue(Result.success({ id: "1" }))
      const response = await subject.deleteThreads(["1"])
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalled()
      expect(response).toEqual({
        status: RequestResponseStatus.Ok,
      })
    })

    test("returns error when `deviceManager.device.request` returns error", async () => {
      deviceManager.device.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.deleteThreads(["1"])
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalled()
      expect(response).toMatchInlineSnapshot(`
        Object {
          "error": Object {
            "data": Array [
              "1",
            ],
            "message": "Delete thread: Something went wrong",
          },
          "status": "error",
        }
      `)
    })
  })

  describe("`toggleThreadsReadStatus` method", () => {
    test("map data and returns success when `deviceManager.device.request` returns success", async () => {
      deviceManager.device.request = jest
        .fn()
        .mockReturnValue(Result.success([thread]))
      const response = await subject.toggleThreadsReadStatus([thread])
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalled()
      expect(response).toEqual({
        status: RequestResponseStatus.Ok,
      })
    })

    test("returns error when `deviceManager.device.request` returns error", async () => {
      deviceManager.device.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.toggleThreadsReadStatus([thread])
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalled()
      expect(response).toMatchInlineSnapshot(`
        Object {
          "error": Object {
            "data": Array [
              Object {
                "contactId": undefined,
                "contactName": undefined,
                "id": "1",
                "lastUpdatedAt": 2020-06-01T13:53:27.087Z,
                "messageSnippet": "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
                "messageType": "INBOX",
                "phoneNumber": "+48 755 853 216",
                "unread": true,
              },
            ],
            "message": "Delete thread: Something went wrong",
          },
          "status": "error",
        }
      `)
    })
  })

  describe("`refreshThread` method", () => {
    test("returns error when fetching thread failed", async () => {
      deviceManager.device.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.refreshThread("1")
      expect(response).toEqual({
        status: RequestResponseStatus.Error,
        error: {
          message: "Refresh thread: Something went wrong",
        },
      })
    })

    describe("when the thread was not found in the device", () => {
      test("removes thread from the repository and returns success response", async () => {
        deviceManager.device.request = jest
          .fn()
          .mockReturnValue(getThreadsSuccessResponse)
        const response = await subject.refreshThread("6666")

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(threadRepository.delete).toHaveBeenCalledTimes(1)
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(threadRepository.delete).toHaveBeenLastCalledWith("6666")
        expect(response).toEqual({
          status: RequestResponseStatus.Ok,
        })
      })
    })

    describe("when the thread was found in the device", () => {
      test("updates the thread and returns success response", async () => {
        deviceManager.device.request = jest
          .fn()
          .mockReturnValue(getThreadsSuccessResponse)
        const response = await subject.refreshThread("1")

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(threadRepository.update).toHaveBeenCalledTimes(1)
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(threadRepository.update).toHaveBeenLastCalledWith(
          mappedPureThread
        )
        expect(response).toEqual({
          status: RequestResponseStatus.Ok,
        })
      })
    })
  })
})
