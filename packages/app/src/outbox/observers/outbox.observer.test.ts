/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import DeviceService, {
  DeviceServiceEventName,
} from "App/__deprecated__/backend/device-service"
import {
  OutboxObserver,
  outboxTime,
} from "App/outbox/observers/outbox.observer"
import { OutboxService } from "App/outbox/services"
import { ipcMain } from "electron-better-ipc"
import { IpcEvent as DataSyncIpcEvent } from "App/data-sync/constants"
import { IpcEvent as NotificationIpcEvent } from "App/notification/constants"
import { Thread } from "App/messages/dto"
import { flushPromises } from "App/core/helpers/flush-promises"
import { MessageType } from "App/messages/constants"

const threadMock: Thread = {
  id: "1",
  phoneNumber: "+48 755 853 216",
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
  messageType: MessageType.INBOX,
}

describe("Outbox Observer: observe", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  describe("when `DeviceServiceEventName.DeviceUnlocked` has been emitted", () => {
    let subject: OutboxObserver
    let eventEmitterMock: EventEmitter
    let outboxService: OutboxService
    beforeEach(() => {
      eventEmitterMock = new EventEmitter()
      const deviceService = {
        on: (eventName: DeviceServiceEventName, listener: () => void) => {
          eventEmitterMock.on(eventName, listener)
        },
      } as unknown as DeviceService
      outboxService = {
        readOutboxEntries: jest.fn(),
      } as unknown as OutboxService
      subject = new OutboxObserver(ipcMain, deviceService, outboxService)
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    test("`readOutboxEntries` has been called", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalled()
    })

    describe("When `readOutboxEntries` returns value", () => {
      let subject: OutboxObserver
      let eventEmitterMock: EventEmitter
      let outboxService: OutboxService
      beforeEach(() => {
        eventEmitterMock = new EventEmitter()
        const deviceService = {
          on: (eventName: DeviceServiceEventName, listener: () => void) => {
            eventEmitterMock.on(eventName, listener)
          },
        } as unknown as DeviceService
        outboxService = {
          readOutboxEntries: jest.fn().mockResolvedValueOnce(threadMock),
        } as unknown as OutboxService
        subject = new OutboxObserver(ipcMain, deviceService, outboxService)
      })

      test("`DataUpdated` and `PushOutboxNotification` is emitted", async () => {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

        subject.observe()
        eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

        await flushPromises()

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(1)
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
          DataSyncIpcEvent.DataUpdated
        )
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
          NotificationIpcEvent.PushOutboxNotification,
          threadMock
        )
      })
    })

    describe("When `readOutboxEntries` returns `undefine`", () => {
      let subject: OutboxObserver
      let eventEmitterMock: EventEmitter
      let outboxService: OutboxService
      beforeEach(() => {
        eventEmitterMock = new EventEmitter()
        const deviceService = {
          on: (eventName: DeviceServiceEventName, listener: () => void) => {
            eventEmitterMock.on(eventName, listener)
          },
        } as unknown as DeviceService
        outboxService = {
          readOutboxEntries: jest.fn().mockResolvedValueOnce(undefined),
        } as unknown as OutboxService
        subject = new OutboxObserver(ipcMain, deviceService, outboxService)
      })

      test("`DataUpdated` and `PushOutboxNotification` isn't emitted", async () => {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

        subject.observe()
        eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

        await flushPromises()

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(1)
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
          DataSyncIpcEvent.DataUpdated
        )
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
          NotificationIpcEvent.PushOutboxNotification,
          threadMock
        )
      })
    })

    test("`readOutboxEntries` has been called every `outboxTime`", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(1)

      await Promise.resolve().then(() => jest.advanceTimersByTime(outboxTime))
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(2)

      await Promise.resolve().then(() => jest.advanceTimersByTime(outboxTime))
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(3)
    })

    test("`DeviceServiceEventName.DeviceDisconnected` interrupts watch OutboxEntries", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(1)

      await Promise.resolve().then(() => jest.advanceTimersByTime(outboxTime))
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(2)

      eventEmitterMock.emit(DeviceServiceEventName.DeviceDisconnected)

      await Promise.resolve().then(() => jest.advanceTimersByTime(outboxTime))
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).not.toHaveBeenCalledTimes(3)
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    test("several `DeviceServiceEventName.DeviceUnlocked` no duplicate logic", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(1)
    })
  })
})
