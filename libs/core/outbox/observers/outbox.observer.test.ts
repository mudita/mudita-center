/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import { DeviceServiceEvent, DeviceType } from "Core/device/constants"
import {
  OutboxObserver,
  outboxTime,
} from "Core/outbox/observers/outbox.observer"
import { OutboxService } from "Core/outbox/services"
import { ipcMain } from "electron-better-ipc"
import { IpcEvent as DataSyncIpcEvent } from "Core/data-sync/constants"
import { IpcEvent as NotificationIpcEvent } from "Core/notification/constants"
import { Thread } from "Core/messages/dto"
import { flushPromises } from "Core/core/helpers/flush-promises"
import { MessageType } from "Core/messages/constants"
import { SerialPortDevice } from "Core/device/types/serial-port-device.type"

const threadMock: Thread = {
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

describe("Outbox Observer: observe", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  describe("when `DeviceServiceEvent.DeviceUnlocked` has been emitted", () => {
    let subject: OutboxObserver
    let eventEmitterMock: EventEmitter
    let outboxService: OutboxService
    beforeEach(() => {
      eventEmitterMock = new EventEmitter()
      outboxService = {
        readOutboxEntries: jest.fn(),
      } as unknown as OutboxService
      subject = new OutboxObserver(ipcMain, eventEmitterMock, outboxService)
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    test("`readOutboxEntries` has been called", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked, {
        deviceType: DeviceType.MuditaPure,
      } as SerialPortDevice)

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
        outboxService = {
          readOutboxEntries: jest.fn().mockResolvedValueOnce(threadMock),
        } as unknown as OutboxService
        subject = new OutboxObserver(ipcMain, eventEmitterMock, outboxService)
      })

      test("`DataUpdated` and `PushOutboxNotification` is emitted", async () => {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

        subject.observe()
        eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked, {
          deviceType: DeviceType.MuditaPure,
        } as SerialPortDevice)

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
        outboxService = {
          readOutboxEntries: jest.fn().mockResolvedValueOnce(undefined),
        } as unknown as OutboxService
        subject = new OutboxObserver(ipcMain, eventEmitterMock, outboxService)
      })

      test("`DataUpdated` and `PushOutboxNotification` isn't emitted", async () => {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

        subject.observe()
        eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked, {
          deviceType: DeviceType.MuditaPure,
        } as SerialPortDevice)

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
      eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked, {
        deviceType: DeviceType.MuditaPure,
      } as SerialPortDevice)

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

    test("`DeviceServiceEvent.DeviceDisconnected` interrupts watch OutboxEntries", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked, {
        deviceType: DeviceType.MuditaPure,
      } as SerialPortDevice)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(1)

      await Promise.resolve().then(() => jest.advanceTimersByTime(outboxTime))
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(2)

      eventEmitterMock.emit(DeviceServiceEvent.DeviceDisconnected)

      await Promise.resolve().then(() => jest.advanceTimersByTime(outboxTime))
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).not.toHaveBeenCalledTimes(3)
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    test("several `DeviceServiceEvent.DeviceUnlocked` no duplicate logic", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked, {
        deviceType: DeviceType.MuditaPure,
      } as SerialPortDevice)
      eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked, {
        deviceType: DeviceType.MuditaPure,
      } as SerialPortDevice)
      eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked, {
        deviceType: DeviceType.MuditaPure,
      } as SerialPortDevice)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(1)
    })
  })

  describe("when `DeviceServiceEvent.DeviceUnlocked` has been emitted for MuditaHarmony", () => {
    let subject: OutboxObserver
    let eventEmitterMock: EventEmitter
    let outboxService: OutboxService
    beforeEach(() => {
      eventEmitterMock = new EventEmitter()
      outboxService = {
        readOutboxEntries: jest.fn(),
      } as unknown as OutboxService
      subject = new OutboxObserver(ipcMain, eventEmitterMock, outboxService)
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    test("`readOutboxEntries` hasn't been called", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked, {
        deviceType: DeviceType.MuditaHarmony,
      } as SerialPortDevice)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(outboxService.readOutboxEntries).not.toHaveBeenCalled()
    })
  })
})
