/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import DeviceService, { DeviceServiceEventName } from "Backend/device-service"
import { ipcMain } from "electron-better-ipc"
import { IpcEvent } from "App/data-sync/constants"
import { MessageObserver } from "App/messages/observers/message.observer"
import {
  GetMessagesByThreadIdResponse,
  GetThreadsResponse,
  MessageService,
} from "App/messages/services"
import { MessageRepository, ThreadRepository } from "App/messages/repositories"
import {
  RequestResponseStatus,
  SuccessRequestResponse,
} from "App/core/types/request-response.interface"
import { Message, MessageType, Thread } from "App/messages/reducers"
import { flushPromises } from "App/core/helpers/flush-promises"

const message: Message = {
  id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content:
    "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.INBOX,
}

const thread: Thread = {
  id: "1",
  phoneNumber: "+48 755 853 216",
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
}

const getMessagesSuccessResponse: SuccessRequestResponse<GetMessagesByThreadIdResponse> =
  {
    data: { data: [message] },
    status: RequestResponseStatus.Ok,
  }

const getThreadsSuccessResponse: SuccessRequestResponse<GetThreadsResponse> = {
  data: { data: [thread], totalCount: 1 },
  status: RequestResponseStatus.Ok,
}

describe("Message Observer: observe", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  describe("when `DeviceServiceEventName.DeviceUnlocked` has been emitted", () => {
    let subject: MessageObserver
    let eventEmitterMock: EventEmitter
    let messageService: MessageService
    let messageRepository: MessageRepository
    let threadRepository: ThreadRepository
    beforeEach(() => {
      jest.resetAllMocks()
      eventEmitterMock = new EventEmitter()
      messageRepository = {
        create: jest.fn(),
      } as unknown as MessageRepository
      threadRepository = {
        create: jest.fn(),
      } as unknown as ThreadRepository
      const deviceService = {
        on: (eventName: DeviceServiceEventName, listener: () => void) => {
          eventEmitterMock.on(eventName, listener)
        },
      } as unknown as DeviceService
      messageService = {
        getMessages: jest.fn(),
        getThreads: jest.fn(),
      } as unknown as MessageService
      subject = new MessageObserver(
        ipcMain,
        deviceService,
        messageService,
        messageRepository,
        threadRepository
      )
    })

    test("`getMessages` has been called", async () => {
      messageService.getMessages = jest
        .fn()
        .mockReturnValue(getMessagesSuccessResponse)
      messageService.getThreads = jest
        .fn()
        .mockReturnValue(getThreadsSuccessResponse)
      expect(messageService.getMessages).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

      expect(messageService.getMessages).toHaveBeenCalled()
    })

    test("`getThreads` has been called", async () => {
      messageService.getMessages = jest
        .fn()
        .mockReturnValue(getMessagesSuccessResponse)
      messageService.getThreads = jest
        .fn()
        .mockReturnValue(getThreadsSuccessResponse)
      expect(messageService.getThreads).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)
      await flushPromises()

      expect(messageService.getThreads).toHaveBeenCalled()
    })

    test("`DataUpdated` is emits when `getMessages` returns true", async () => {
      messageService.getMessages = jest
        .fn()
        .mockReturnValue(getMessagesSuccessResponse)
      messageService.getThreads = jest
        .fn()
        .mockReturnValue(getThreadsSuccessResponse)
      expect(messageService.getMessages).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)
      await flushPromises()

      expect(messageService.getMessages).toHaveBeenCalledTimes(1)
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
        IpcEvent.DataUpdated
      )
    })

    test("`DataUpdated` is emits when `getThreads` returns true", async () => {
      messageService.getMessages = jest
        .fn()
        .mockReturnValue(getMessagesSuccessResponse)
      messageService.getThreads = jest
        .fn()
        .mockReturnValue(getThreadsSuccessResponse)
      expect(messageService.getThreads).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)
      await flushPromises()

      expect(messageService.getThreads).toHaveBeenCalledTimes(1)
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
        IpcEvent.DataUpdated
      )
    })

    test("`DataUpdated` isn't emits when message request response returns the same value as previous", async () => {
      jest
        .spyOn(
          subject as unknown as { previousMessagesString: any },
          "previousMessagesString",
          "get"
        )
        .mockImplementation(() =>
          JSON.stringify(getMessagesSuccessResponse.data.data)
        )

      jest
        .spyOn(
          subject as unknown as { previousThreadsString: any },
          "previousThreadsString",
          "get"
        )
        .mockImplementation(() =>
          JSON.stringify(getThreadsSuccessResponse.data.data)
        )

      messageService.getMessages = jest
        .fn()
        .mockReturnValue(getMessagesSuccessResponse)
      messageService.getThreads = jest
        .fn()
        .mockReturnValue(getThreadsSuccessResponse)
      expect(messageService.getThreads).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)
      await flushPromises()

      expect(messageService.getThreads).toHaveBeenCalledTimes(1)
      expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
        IpcEvent.DataUpdated
      )
    })

    test("several `DeviceServiceEventName.DeviceUnlocked` no duplicate logic", async () => {
      messageService.getMessages = jest
        .fn()
        .mockReturnValue(getMessagesSuccessResponse)
      messageService.getThreads = jest
        .fn()
        .mockReturnValue(getThreadsSuccessResponse)
      expect(messageService.getMessages).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

      expect(messageService.getMessages).toHaveBeenCalledTimes(1)
    })
  })
})
