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
import { ThreadEntryHandlerService } from "App/outbox/services/thread-entry-handler.service"
import { Thread } from "App/messages/reducers"
import { ThreadService } from "App/messages/services"
import { ThreadRepository } from "App/messages/repositories"

const successResponse: SuccessRequestResponse<Thread> = {
  status: RequestResponseStatus.Ok,
  data: {} as Thread,
}

const errorResponse: ErrorRequestResponse = {
  status: RequestResponseStatus.Error,
}

beforeEach(() => {
  jest.resetAllMocks()
})

describe("ThreadEntryHandlerService: handleEntry", () => {
  describe("when Thread Entry has Deleted change", () => {
    let subject: ThreadEntryHandlerService
    let threadService: ThreadService
    let threadRepository: ThreadRepository
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Thread,
      change: OutboxEntryChange.Deleted,
      record_id: 1,
    }

    beforeEach(() => {
      threadRepository = {
        delete: jest.fn(),
      } as unknown as ThreadRepository
      threadService = {
        getThread: jest.fn().mockReturnValue(successResponse),
      } as unknown as ThreadService
      subject = new ThreadEntryHandlerService(threadService, threadRepository)
    })

    test("`delete` method in threadRepository was called", async () => {
      await subject.handleEntry(entry)
      expect(threadRepository.delete).toHaveBeenCalledWith("1")
    })
  })

  describe("when Thread Entry has Created change", () => {
    let subject: ThreadEntryHandlerService
    let threadService: ThreadService
    let threadRepository: ThreadRepository
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Thread,
      change: OutboxEntryChange.Created,
      record_id: 1,
    }

    beforeEach(() => {
      threadRepository = {
        create: jest.fn(),
      } as unknown as ThreadRepository
      threadService = {
        getThread: jest.fn().mockReturnValue(successResponse),
      } as unknown as ThreadService
      subject = new ThreadEntryHandlerService(threadService, threadRepository)
    })

    test("`create` method in threadRepository was called", async () => {
      await subject.handleEntry(entry)
      expect(threadRepository.create).toHaveBeenCalled()
    })
  })

  describe("when Thread Entry has Updated change", () => {
    let subject: ThreadEntryHandlerService
    let threadService: ThreadService
    let threadRepository: ThreadRepository
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Thread,
      change: OutboxEntryChange.Updated,
      record_id: 1,
    }

    beforeEach(() => {
      threadRepository = {
        update: jest.fn(),
      } as unknown as ThreadRepository
      threadService = {
        getThread: jest.fn().mockReturnValue(successResponse),
      } as unknown as ThreadService
      subject = new ThreadEntryHandlerService(threadService, threadRepository)
    })

    test("`update` method in threadRepository was called", async () => {
      await subject.handleEntry(entry)
      expect(threadRepository.update).toHaveBeenCalled()
    })
  })

  describe("when Thread Entry has Relation change and `getThread` return success ", () => {
    let subject: ThreadEntryHandlerService
    let threadService: ThreadService
    let threadRepository: ThreadRepository
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Thread,
      change: OutboxEntryChange.Relation,
      record_id: 1,
    }

    beforeEach(() => {
      threadRepository = {
        create: jest.fn(),
      } as unknown as ThreadRepository

      threadService = {
        getThread: jest.fn().mockReturnValue(successResponse),
      } as unknown as ThreadService
      subject = new ThreadEntryHandlerService(threadService, threadRepository)
    })

    test("`create` method in threadRepository was called", async () => {
      await subject.handleEntry(entry)
      expect(threadRepository.create).toHaveBeenCalled()
    })
  })

  describe("when Thread Entry has Updated change and `getThread` returns error", () => {
    let subject: ThreadEntryHandlerService
    let threadService: ThreadService
    let threadRepository: ThreadRepository
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Thread,
      change: OutboxEntryChange.Updated,
      record_id: 1,
    }

    beforeEach(() => {
      threadRepository = {
        update: jest.fn(),
      } as unknown as ThreadRepository
      threadService = {
        getThread: jest.fn().mockReturnValue(errorResponse),
      } as unknown as ThreadService
      subject = new ThreadEntryHandlerService(threadService, threadRepository)
    })

    test("`update` method in threadRepository was called", async () => {
      await subject.handleEntry(entry)
      expect(threadRepository.update).not.toHaveBeenCalled()
    })
  })
})
