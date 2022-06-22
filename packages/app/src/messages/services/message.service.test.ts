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
import { AcceptablePureMessageType } from "App/messages/presenters"
import { ThreadService } from "App/messages/services/thread.service"
import {
  Message as PureMessage,
  MessageType,
  MessageType as PureMessageType,
  MessagesCategory as PureMessagesCategory,
  Endpoint,
  Method,
} from "@mudita/pure"
import { NewMessage } from "App/messages/dto"
import { MessageRepository } from "App/messages/repositories"
import assert from "assert"

const deviceService = {
  request: jest.fn(),
} as unknown as DeviceService

const threadService = {
  getThreads: jest.fn(),
} as unknown as ThreadService

const messageRepository = {
  findById: jest.fn(),
} as unknown as MessageRepository

const subject = new MessageService(
  deviceService,
  threadService,
  messageRepository
)

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
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error  when `deviceService.request` returns error", async () => {
      deviceService.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.getMessage("1")
      expect(deviceService.request).toHaveBeenCalled()
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
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error when `deviceService.request` returns error", async () => {
      deviceService.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.getMessages({ limit: 1, offset: 0 })
      expect(deviceService.request).toHaveBeenCalled()
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
        expect(response.status).toEqual(RequestResponseStatus.Error)
      })
    })

    describe("when `deviceService.request` returns error", () => {
      test("method returns error", async () => {
        deviceService.request = jest.fn().mockReturnValue(errorResponse)
        const response = await subject.createMessage(newMessageWithThreadId)
        expect(deviceService.request).toHaveBeenCalled()
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

  describe("`deleteMessage` method", () => {
    const messageId = "123"
    test("construct proper delete request to device service", async () => {
      deviceService.request = jest.fn().mockReturnValue(successResponse)
      await subject.deleteMessage(messageId)
      expect(deviceService.request).toHaveBeenCalledTimes(1)
      expect(deviceService.request).toHaveBeenCalledWith({
        body: {
          category: PureMessagesCategory.message,
          messageID: 123,
        },
        endpoint: Endpoint.Messages,
        method: Method.Delete,
      })
    })

    test("returns success when delete request succeeded", async () => {
      deviceService.request = jest.fn().mockReturnValue(successResponse)
      const result = await subject.deleteMessage(messageId)
      expect(result).toEqual({ status: RequestResponseStatus.Ok })
    })

    test("returns error when delete request failed", async () => {
      deviceService.request = jest.fn().mockReturnValue(errorResponse)
      const result = await subject.deleteMessage(messageId)
      expect(result).toEqual({
        status: RequestResponseStatus.Error,
        error: {
          message: "Delete message: Something went wrong",
        },
      })
    })
  })

  describe("`resendMessage` method", () => {
    describe("when message doesn't exist in local index", () => {
      const messageId = "123"

      test("returns an error message", async () => {
        messageRepository.findById = jest.fn().mockReturnValueOnce(undefined)
        const result = await subject.resendMessage(messageId)
        expect(deviceService.request).toHaveBeenCalledTimes(0)
        expect(result).toEqual({
          status: RequestResponseStatus.Error,
          error: {
            message: "Message not fond in internal database",
          },
        })
      })
    })

    describe("when message exist in local index", () => {
      const messageId = "6"

      test("returns an error message", async () => {
        messageRepository.findById = jest.fn().mockReturnValueOnce({
          id: "6",
          date: 1547465101,
          content:
            "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
          threadId: "1",
          phoneNumber: "+48500600700",
          messageType: MessageType.INBOX,
        })
        deviceService.request = jest.fn().mockReturnValue({
          ...successResponse,
          data: pureMessage,
        })

        const result = await subject.resendMessage(messageId)
        expect(deviceService.request).toHaveBeenLastCalledWith({
          body: {
            number: "+48500600700",
            messageBody:
              "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
            category: "message",
          },
          endpoint: Endpoint.Messages,
          method: Method.Post,
        })

        expect(result).toEqual({
          status: RequestResponseStatus.Ok,
          data: {
            messageParts: [
              {
                message: {
                  phoneNumber: "+48500600700",
                  id: "6",
                  date: new Date("2019-01-14T11:25:01.000Z"),
                  content:
                    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
                  threadId: "1",
                  messageType: "OUTBOX",
                },
                thread: undefined,
              },
            ],
          },
        })
      })
    })
  })
})
