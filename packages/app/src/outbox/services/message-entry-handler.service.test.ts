/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OutboxEntry, OutboxEntryChange, OutboxEntryType } from "@mudita/pure"
import {
  ErrorRequestResponse,
  RequestResponseStatus,
  SuccessRequestResponse,
} from "App/core/types/request-response.interface"
import { MessageEntryHandlerService } from "App/outbox/services/message-entry-handler.service"
import { Message, MessageType } from "App/messages/reducers"
import { MessageService } from "App/messages/services"
import { MessageRepository } from "App/messages/repositories"
import { ThreadEntryHandlerService } from "App/outbox/services/thread-entry-handler.service"

const messageMock: Message = {
  id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content:
    "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.INBOX,
}
const successResponse: SuccessRequestResponse<Message> = {
  status: RequestResponseStatus.Ok,
  data: messageMock,
}

const errorResponse: ErrorRequestResponse = {
  status: RequestResponseStatus.Error,
}

beforeEach(() => {
  jest.resetAllMocks()
})

describe("MessageEntryHandlerService: handleEntry", () => {
  describe("when Message Entry has Deleted change", () => {
    let subject: MessageEntryHandlerService
    let messageService: MessageService
    let messageRepository: MessageRepository
    let threadEntryHandlerService: ThreadEntryHandlerService
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Message,
      change: OutboxEntryChange.Deleted,
      record_id: 1,
    }

    beforeEach(() => {
      threadEntryHandlerService = {
        handleEntry: jest.fn(),
      } as unknown as ThreadEntryHandlerService
      messageRepository = {
        delete: jest.fn(),
      } as unknown as MessageRepository
      messageService = {
        getMessage: jest.fn().mockReturnValue(successResponse),
      } as unknown as MessageService
      subject = new MessageEntryHandlerService(
        messageService,
        messageRepository,
        threadEntryHandlerService
      )
    })

    test("`delete` method in messageRepository was called", async () => {
      expect(await subject.handleEntry(entry)).toBeUndefined()
      expect(messageRepository.delete).toHaveBeenCalledWith("1")
    })

    test("`threadEntryHandlerService.handleEntry` method was called", async () => {
      expect(await subject.handleEntry(entry)).toBeUndefined()
      expect(threadEntryHandlerService.handleEntry).toHaveBeenCalled()
    })
  })

  describe("when Message Entry has Created change", () => {
    let subject: MessageEntryHandlerService
    let messageService: MessageService
    let messageRepository: MessageRepository
    let threadEntryHandlerService: ThreadEntryHandlerService
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Message,
      change: OutboxEntryChange.Created,
      record_id: 1,
    }

    beforeEach(() => {
      threadEntryHandlerService = {
        handleEntry: jest.fn(),
      } as unknown as ThreadEntryHandlerService
      messageRepository = {
        create: jest.fn().mockImplementationOnce((value: Message) => value),
      } as unknown as MessageRepository
      messageService = {
        getMessage: jest.fn().mockReturnValue(successResponse),
      } as unknown as MessageService
      subject = new MessageEntryHandlerService(
        messageService,
        messageRepository,
        threadEntryHandlerService
      )
    })

    test("`create` method in messageRepository was called", async () => {
      expect(await subject.handleEntry(entry)).toEqual(messageMock)
      expect(messageRepository.create).toHaveBeenCalled()
    })

    test("`threadEntryHandlerService.handleEntry` method was called", async () => {
      expect(await subject.handleEntry(entry)).toEqual(messageMock)
      expect(threadEntryHandlerService.handleEntry).toHaveBeenCalled()
    })
  })

  describe("when Message Entry has Updated change", () => {
    let subject: MessageEntryHandlerService
    let messageService: MessageService
    let messageRepository: MessageRepository
    let threadEntryHandlerService: ThreadEntryHandlerService
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Message,
      change: OutboxEntryChange.Updated,
      record_id: 1,
    }

    beforeEach(() => {
      threadEntryHandlerService = {
        handleEntry: jest.fn(),
      } as unknown as ThreadEntryHandlerService
      messageRepository = {
        update: jest.fn().mockImplementationOnce((value: Message) => value),
      } as unknown as MessageRepository
      messageService = {
        getMessage: jest.fn().mockReturnValue(successResponse),
      } as unknown as MessageService
      subject = new MessageEntryHandlerService(
        messageService,
        messageRepository,
        threadEntryHandlerService
      )
    })

    test("`update` method in messageRepository was called", async () => {
      expect(await subject.handleEntry(entry)).toEqual(messageMock)
      expect(messageRepository.update).toHaveBeenCalled()
    })

    test("`threadEntryHandlerService.handleEntry` method was called", async () => {
      expect(await subject.handleEntry(entry)).toEqual(messageMock)
      expect(threadEntryHandlerService.handleEntry).toHaveBeenCalled()
    })
  })

  describe("when Message Entry has Updated change and `getMessage` returns error", () => {
    let subject: MessageEntryHandlerService
    let messageService: MessageService
    let messageRepository: MessageRepository
    let threadEntryHandlerService: ThreadEntryHandlerService
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Message,
      change: OutboxEntryChange.Updated,
      record_id: 1,
    }

    beforeEach(() => {
      threadEntryHandlerService = {
        handleEntry: jest.fn(),
      } as unknown as ThreadEntryHandlerService
      messageRepository = {
        update: jest.fn().mockImplementationOnce((value: Message) => value),
      } as unknown as MessageRepository
      messageService = {
        getMessage: jest.fn().mockReturnValue(errorResponse),
      } as unknown as MessageService
      subject = new MessageEntryHandlerService(
        messageService,
        messageRepository,
        threadEntryHandlerService
      )
    })

    test("`update` method in messageRepository wasn't called", async () => {
      expect(await subject.handleEntry(entry)).toBeUndefined()
      expect(messageRepository.update).not.toHaveBeenCalled()
    })

    test("`threadEntryHandlerService.handleEntry` method wasn't called", async () => {
      expect(await subject.handleEntry(entry)).toBeUndefined()
      expect(threadEntryHandlerService.handleEntry).not.toHaveBeenCalled()
    })
  })
})
