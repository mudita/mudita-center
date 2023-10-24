/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import { DeviceServiceEvent } from "App/device/constants"
import { DeviceService } from "App/device/services"
import { ipcMain } from "electron-better-ipc"
import { flushPromises } from "App/core/helpers/flush-promises"
import {
  DeviceLockTimeIntervalTime,
  DeviceLockTimeObserver,
} from "App/device/observers/device-lock-time.observer"
import { ResultObject } from "App/core/builder"
import { PhoneLockTime } from "App/device/dto"
import { DeviceIpcEvent } from "App/device/constants/device-ipc-event.constant"
import { AppError } from "App/core/errors"

const successResult: ResultObject<PhoneLockTime> = {
  ok: true,
  error: undefined,
  data: {
    phoneLockTime: 100,
    timeLeftToNextAttempt: 30,
  },
}

const failureResult: ResultObject<PhoneLockTime> = {
  ok: false,
  error: new AppError("", ""),
  data: undefined,
}

describe("Device Lock Time Observer: observe", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  describe("When `unlockTime` returns success result", () => {
    let subject: DeviceLockTimeObserver
    let eventEmitterMock: EventEmitter
    let deviceService: DeviceService
    beforeEach(() => {
      eventEmitterMock = new EventEmitter()
      deviceService = {
        unlockTime: jest.fn().mockReturnValue(successResult),
      } as unknown as DeviceService
      subject = new DeviceLockTimeObserver(
        ipcMain,
        eventEmitterMock,
        deviceService
      )
    })

    test("`DeviceLockTimeUpdated` is emitted with result data", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEvent.DeviceLocked)

      await flushPromises()

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(1)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
        DeviceIpcEvent.DeviceLockTimeUpdated,
        successResult.data
      )
    })
  })

  describe("When `unlockTime` returns failure result & previous value is undefined", () => {
    let subject: DeviceLockTimeObserver
    let eventEmitterMock: EventEmitter
    let deviceService: DeviceService
    beforeEach(() => {
      eventEmitterMock = new EventEmitter()
      deviceService = {
        unlockTime: jest.fn().mockReturnValue(failureResult),
      } as unknown as DeviceService
      subject = new DeviceLockTimeObserver(
        ipcMain,
        eventEmitterMock,
        deviceService
      )
      subject["previousValue"] = undefined
    })

    test("`DeviceLockTimeUpdated` isn't emitted", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEvent.DeviceLocked)

      await flushPromises()

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(1)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
        DeviceIpcEvent.DeviceLockTimeUpdated,
        undefined
      )
    })
  })

  describe("When `unlockTime` returns failure result & previous value isn't undefined", () => {
    let subject: DeviceLockTimeObserver
    let eventEmitterMock: EventEmitter
    let deviceService: DeviceService
    beforeEach(() => {
      eventEmitterMock = new EventEmitter()
      deviceService = {
        unlockTime: jest.fn().mockReturnValue(failureResult),
      } as unknown as DeviceService
      subject = new DeviceLockTimeObserver(
        ipcMain,
        eventEmitterMock,
        deviceService
      )
      subject["previousValue"] = {}
    })

    test("`DeviceLockTimeUpdated` is emitted with undefined", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEvent.DeviceLocked)

      await flushPromises()

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(1)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
        DeviceIpcEvent.DeviceLockTimeUpdated,
        undefined
      )
    })
  })

  describe("when `DeviceServiceEvent.DeviceLocked` has been emitted", () => {
    let subject: DeviceLockTimeObserver
    let eventEmitterMock: EventEmitter
    let deviceService: DeviceService
    beforeEach(() => {
      eventEmitterMock = new EventEmitter()
      deviceService = {
        unlockTime: jest.fn().mockReturnValue(successResult),
      } as unknown as DeviceService
      subject = new DeviceLockTimeObserver(
        ipcMain,
        eventEmitterMock,
        deviceService
      )
    })

    test("`unlockTime` has been called", () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEvent.DeviceLocked)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalled()
    })

    test("`unlockTime` has been called every `DeviceLockTimeIntervalTime`", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEvent.DeviceLocked)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(1)

      await Promise.resolve().then(() =>
        jest.advanceTimersByTime(DeviceLockTimeIntervalTime)
      )
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(2)

      await Promise.resolve().then(() =>
        jest.advanceTimersByTime(DeviceLockTimeIntervalTime)
      )
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(3)
    })

    test("`DeviceServiceEvent.DeviceDisconnected` interrupts watch DeviceLockTime", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEvent.DeviceLocked)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(1)

      await Promise.resolve().then(() =>
        jest.advanceTimersByTime(DeviceLockTimeIntervalTime)
      )
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(2)

      eventEmitterMock.emit(DeviceServiceEvent.DeviceDisconnected)

      await Promise.resolve().then(() =>
        jest.advanceTimersByTime(DeviceLockTimeIntervalTime)
      )
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).not.toHaveBeenCalledTimes(3)
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    test("several `DeviceServiceEvent.DeviceLocked` no duplicate logic", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(0)

      subject.observe()
      eventEmitterMock.emit(DeviceServiceEvent.DeviceLocked)
      eventEmitterMock.emit(DeviceServiceEvent.DeviceLocked)
      eventEmitterMock.emit(DeviceServiceEvent.DeviceLocked)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.unlockTime).toHaveBeenCalledTimes(1)
    })
  })
})
