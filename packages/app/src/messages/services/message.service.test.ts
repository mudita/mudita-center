/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ErrorRequestResponse,
  RequestResponseStatus,
  SuccessRequestResponse,
} from "App/core/types/request-response.interface"
import { MessageService } from "App/messages/services/message.service"
import DeviceService from "App/__deprecated__/backend/device-service"
import {
  AcceptablePureMessageType,
  MessagePresenter,
} from "App/messages/presenters"
import { ThreadService } from "App/messages/services/thread.service"
import {
  Message as PureMessage,
  MessageType,
  MessageType as PureMessageType,
} from "@mudita/pure"
import { NewMessage } from "App/messages/reducers"
import assert from "assert"

jest.mock("App/messages/presenters")
;(MessagePresenter as unknown as jest.Mock).mockImplementation(() => {
  return {
    mapToMessage: jest.fn(),
    mapToPureMessageMessagesBody: jest.fn(),
  }
})

const deviceService = {
  request: jest.fn(),
} as unknown as DeviceService

const threadService = {
  getThreads: jest.fn(),
} as unknown as ThreadService

const subject = new MessageService(deviceService, threadService)

const successResponse: SuccessRequestResponse<any> = {
  status: RequestResponseStatus.Ok,
  data: {},
}

const errorResponse: ErrorRequestResponse = {
  status: RequestResponseStatus.Error,
}

const pureMessage: PureMessage & {
  messageType: AcceptablePureMessageType
} = {
  contactID: 2,
  messageBody:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  messageID: 6,
  messageType: PureMessageType.OUTBOX,
  createdAt: 1547465101,
  threadID: 1,
  number: "+48500600700",
}

const newMessageWithThreadId: NewMessage = {
  content: pureMessage.messageBody,
  phoneNumber: pureMessage.number,
  threadId: String(pureMessage.threadID),
}

const newLongMessageWithThreadId: NewMessage = {
  ...newMessageWithThreadId,
  content: "x".repeat(500),
}

const newMessageWithoutThreadId: NewMessage = {
  content: pureMessage.messageBody,
  phoneNumber: pureMessage.number,
}

const newLongMessageWithoutThreadId: NewMessage = {
  ...newMessageWithoutThreadId,
  content: "x".repeat(500),
}

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`MessageService`", () => {
  describe("`getMessage` method", () => {
    test("map data and returns success when `deviceService.request` returns success", async () => {
      deviceService.request = jest.fn().mockReturnValue({
        ...successResponse,
        data: pureMessage,
      })
      const response = await subject.getMessage("1")
      expect(deviceService.request).toHaveBeenCalled()
      expect(MessagePresenter.mapToMessage).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error  when `deviceService.request` returns error", async () => {
      deviceService.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.getMessage("1")
      expect(deviceService.request).toHaveBeenCalled()
      expect(MessagePresenter.mapToMessage).not.toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("`getMessages` method", () => {
    test("map data and returns success when `deviceService.request` returns success", async () => {
      deviceService.request = jest.fn().mockReturnValue({
        ...successResponse,
        data: { entries: [pureMessage] },
      })
      const response = await subject.getMessages({ limit: 1, offset: 0 })
      expect(deviceService.request).toHaveBeenCalled()
      expect(MessagePresenter.mapToMessage).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error when `deviceService.request` returns error", async () => {
      deviceService.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.getMessages({ limit: 1, offset: 0 })
      expect(deviceService.request).toHaveBeenCalled()
      expect(MessagePresenter.mapToMessage).not.toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("`createMessage` method", () => {
    describe("when message is lower than 469 bytes", () => {
      test("the `deviceService.request` is called once", async () => {
        deviceService.request = jest.fn().mockReturnValue({
          ...successResponse,
          data: pureMessage,
        })
        const response = await subject.createMessage(newMessageWithThreadId)
        expect(response.status).toEqual(RequestResponseStatus.Ok)
        expect(deviceService.request).toHaveBeenCalledTimes(1)
      })
    })

    describe("when message is bigger than 469 bytes", () => {
      test("the `deviceService.request` is called more than once", async () => {
        deviceService.request = jest.fn().mockReturnValue({
          ...successResponse,
          data: pureMessage,
        })
        const newLongMessageWithThreadId: NewMessage = {
          ...newMessageWithThreadId,
          content: "x".repeat(500),
        }
        const response = await subject.createMessage(newLongMessageWithThreadId)
        expect(response.status).toEqual(RequestResponseStatus.Ok)
        expect(deviceService.request).toHaveBeenCalledTimes(2)
      })
    })

    describe("when every part of the message is sent successfully", () => {
      describe("when `deviceService.request` returns success with acceptable pure message type", () => {
        test("return in response just message when threadId is known", async () => {
          deviceService.request = jest.fn().mockReturnValue({
            ...successResponse,
            data: pureMessage,
          })
          const response = await subject.createMessage(
            newLongMessageWithThreadId
          )
          expect(deviceService.request).toHaveBeenCalled()
          expect(MessagePresenter.mapToMessage).toHaveBeenCalled()
          expect(response.status).toEqual(RequestResponseStatus.Ok)

          assert(response.data?.messageParts)
          for (const part of response.data.messageParts) {
            expect(part.message).not.toBeUndefined()
            expect(part.thread).toBeUndefined()
          }
        })

        test("return in response message and thread when threadId isn't known", async () => {
          deviceService.request = jest.fn().mockReturnValue({
            ...successResponse,
            data: pureMessage,
          })
          threadService.getThreads = jest.fn().mockReturnValue({
            ...successResponse,
            data: { data: [{ id: "threadId" }] },
          })
          const response = await subject.createMessage(
            newLongMessageWithoutThreadId
          )
          expect(deviceService.request).toHaveBeenCalled()
          expect(MessagePresenter.mapToMessage).toHaveBeenCalled()
          expect(response.status).toEqual(RequestResponseStatus.Ok)

          assert(response.data?.messageParts)
          for (const part of response.data.messageParts) {
            expect(part.message).not.toBeUndefined()
            expect(part.thread).not.toBeUndefined()
          }
        })
      })
    })

    describe("when `deviceService.request` returns success with no acceptable pure message type", () => {
      test("method returns error", async () => {
        deviceService.request = jest.fn().mockReturnValue({
          ...successResponse,
          data: { ...pureMessage, messageType: MessageType.UNKNOWN },
        })
        const response = await subject.createMessage(newMessageWithThreadId)
        expect(deviceService.request).toHaveBeenCalled()
        expect(MessagePresenter.mapToMessage).not.toHaveBeenCalled()
        expect(response.status).toEqual(RequestResponseStatus.Error)
      })
    })

    describe("when `deviceService.request` returns error", () => {
      test("method returns error", async () => {
        deviceService.request = jest.fn().mockReturnValue(errorResponse)
        const response = await subject.createMessage(newMessageWithThreadId)
        expect(deviceService.request).toHaveBeenCalled()
        expect(MessagePresenter.mapToMessage).not.toHaveBeenCalled()
        expect(response.status).toEqual(RequestResponseStatus.Error)
      })
    })

    describe("when `deviceService.request` returns error for the second message", () => {
      test("method returns error", async () => {
        deviceService.request = jest
          .fn()
          .mockReturnValueOnce({
            ...successResponse,
            data: pureMessage,
          })
          .mockReturnValueOnce(errorResponse)
        const response = await subject.createMessage(newLongMessageWithThreadId)
        expect(deviceService.request).toHaveBeenCalled()

        expect(response.status).toEqual(RequestResponseStatus.Error)
      })
    })
  })
})
