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
import { Message } from "App/messages/reducers"
import { MessageService } from "App/messages/services"
import { MessageRepository } from "App/messages/repositories"

const successResponse: SuccessRequestResponse<Message> = {
  status: RequestResponseStatus.Ok,
  data: {} as Message,
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
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Message,
      change: OutboxEntryChange.Deleted,
      record_id: 1,
    }

    beforeEach(() => {
      messageRepository = {
        delete: jest.fn(),
      } as unknown as MessageRepository
      messageService = {
        getMessage: jest.fn().mockReturnValue(successResponse),
      } as unknown as MessageService
      subject = new MessageEntryHandlerService(
        messageService,
        messageRepository
      )
    })

    test("`delete` method in messageRepository was called", async () => {
      await subject.handleEntry(entry)
      expect(messageRepository.delete).toHaveBeenCalledWith("1")
    })
  })

  describe("when Message Entry has Created change", () => {
    let subject: MessageEntryHandlerService
    let messageService: MessageService
    let messageRepository: MessageRepository
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Message,
      change: OutboxEntryChange.Created,
      record_id: 1,
    }

    beforeEach(() => {
      messageRepository = {
        create: jest.fn(),
      } as unknown as MessageRepository
      messageService = {
        getMessage: jest.fn().mockReturnValue(successResponse),
      } as unknown as MessageService
      subject = new MessageEntryHandlerService(
        messageService,
        messageRepository
      )
    })

    test("`create` method in messageRepository was called", async () => {
      await subject.handleEntry(entry)
      expect(messageRepository.create).toHaveBeenCalled()
    })
  })

  describe("when Message Entry has Updated change", () => {
    let subject: MessageEntryHandlerService
    let messageService: MessageService
    let messageRepository: MessageRepository
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Message,
      change: OutboxEntryChange.Updated,
      record_id: 1,
    }

    beforeEach(() => {
      messageRepository = {
        update: jest.fn(),
      } as unknown as MessageRepository
      messageService = {
        getMessage: jest.fn().mockReturnValue(successResponse),
      } as unknown as MessageService
      subject = new MessageEntryHandlerService(
        messageService,
        messageRepository
      )
    })

    test("`update` method in messageRepository was called", async () => {
      await subject.handleEntry(entry)
      expect(messageRepository.update).toHaveBeenCalled()
    })
  })

  describe("when Message Entry has Updated change and `getMessage` returns error", () => {
    let subject: MessageEntryHandlerService
    let messageService: MessageService
    let messageRepository: MessageRepository
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Message,
      change: OutboxEntryChange.Updated,
      record_id: 1,
    }

    beforeEach(() => {
      messageRepository = {
        update: jest.fn(),
      } as unknown as MessageRepository
      messageService = {
        getMessage: jest.fn().mockReturnValue(errorResponse),
      } as unknown as MessageService
      subject = new MessageEntryHandlerService(
        messageService,
        messageRepository
      )
    })

    test("`update` method in messageRepository was called", async () => {
      await subject.handleEntry(entry)
      expect(messageRepository.update).not.toHaveBeenCalled()
    })
  })
})
