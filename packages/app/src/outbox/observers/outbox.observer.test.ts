/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import DeviceService, { DeviceServiceEventName } from "Backend/device-service"
import { OutboxObserver, outboxTime } from "App/outbox/observers/outbox.observer"
import { OutboxService } from "App/outbox/services"

describe("Method: observe", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
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
      subject = new OutboxObserver(deviceService, outboxService)
    })

    test("`readOutboxEntries` has been called", async () => {
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

      expect(outboxService.readOutboxEntries).toHaveBeenCalled()
    })

    test("`readOutboxEntries` has been called every `outboxTime`", async () => {
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(1)

      await Promise.resolve().then(() => jest.advanceTimersByTime(outboxTime))
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(2)

      await Promise.resolve().then(() => jest.advanceTimersByTime(outboxTime))
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(3)
    })

    test("`DeviceServiceEventName.DeviceDisconnected` interrupts watch OutboxEntries", async () => {
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(1)

      await Promise.resolve().then(() => jest.advanceTimersByTime(outboxTime))
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(2)

      eventEmitterMock.emit(DeviceServiceEventName.DeviceDisconnected)

      await Promise.resolve().then(() => jest.advanceTimersByTime(outboxTime))
      expect(outboxService.readOutboxEntries).not.toHaveBeenCalledTimes(3)
    })

    test("several `DeviceServiceEventName.DeviceUnlocked` no duplicate logic", async () => {
      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)
      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

      expect(outboxService.readOutboxEntries).toHaveBeenCalledTimes(1)
    })
  })
})
