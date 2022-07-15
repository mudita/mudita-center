/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import DeviceService, {
  DeviceServiceEventName,
} from "App/__deprecated__/backend/device-service"
import { CrashDumpObserver } from "App/crash-dump/observers/crash-dump.observer"
import { CrashDumpService } from "App/crash-dump/services"
import { SettingsService } from "App/settings/services"
import { ipcMain } from "electron-better-ipc"
import { IpcCrashDumpRenderedEvent } from "App/crash-dump/constants"

describe("Crash Dump Observer: observe", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  describe("when `DeviceServiceEventName.DeviceUnlocked` has been emitted", () => {
    describe("when `getDeviceCrashDumpFiles` returns empty list", () => {
      let subject: CrashDumpObserver
      let eventEmitterMock: EventEmitter
      let crashDumpService: CrashDumpService
      let settingsService: SettingsService

      beforeEach(() => {
        eventEmitterMock = new EventEmitter()
        const deviceService = {
          on: (eventName: DeviceServiceEventName, listener: () => void) => {
            eventEmitterMock.on(eventName, listener)
          },
        } as unknown as DeviceService
        crashDumpService = {
          getDeviceCrashDumpFiles: jest.fn().mockReturnValue({ data: [] }),
        } as unknown as CrashDumpService
        settingsService = {
          getSettings: jest.fn().mockReturnValue({
            ignoredCrashDumps: [],
          }),
        } as unknown as SettingsService
        subject = new CrashDumpObserver(
          ipcMain,
          deviceService,
          crashDumpService,
          settingsService
        )
      })

      test("calls `getDeviceCrashDumpFiles` and `getAppSettings` methods", async () => {
        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalledTimes(
          0
        )
        expect(settingsService.getSettings).toHaveBeenCalledTimes(0)

        subject.observe()
        eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

        await Promise.resolve().then(() => jest.advanceTimersByTime(100))

        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalled()
        expect(settingsService.getSettings).toHaveBeenCalled()

        expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
          IpcCrashDumpRenderedEvent.CrashDumpExists
        )
      })
    })

    describe("when `getDeviceCrashDumpFiles` returns crash dumps list and `ignoredCrashDumps` is empty", () => {
      let subject: CrashDumpObserver
      let eventEmitterMock: EventEmitter
      let crashDumpService: CrashDumpService
      let settingsService: SettingsService

      beforeEach(() => {
        eventEmitterMock = new EventEmitter()
        const deviceService = {
          on: (eventName: DeviceServiceEventName, listener: () => void) => {
            eventEmitterMock.on(eventName, listener)
          },
        } as unknown as DeviceService
        crashDumpService = {
          getDeviceCrashDumpFiles: jest
            .fn()
            .mockReturnValue({ data: ["/sys/crash_dumps/crashdump.hex"] }),
        } as unknown as CrashDumpService
        settingsService = {
          getSettings: jest.fn().mockReturnValue({
            ignoredCrashDumps: [],
          }),
        } as unknown as SettingsService
        subject = new CrashDumpObserver(
          ipcMain,
          deviceService,
          crashDumpService,
          settingsService
        )
      })

      test("emits `IpcCrashDumpRenderedEvent.CrashDumpExists` event", async () => {
        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalledTimes(
          0
        )
        expect(settingsService.getSettings).toHaveBeenCalledTimes(0)

        subject.observe()
        eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

        await Promise.resolve().then(() => jest.advanceTimersByTime(100))

        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalled()
        expect(settingsService.getSettings).toHaveBeenCalled()

        expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
          IpcCrashDumpRenderedEvent.CrashDumpExists,
          ["/sys/crash_dumps/crashdump.hex"]
        )
      })
    })

    describe("when `getDeviceCrashDumpFiles` returns crash dumps list and `ignoredCrashDumps` contains same name", () => {
      let subject: CrashDumpObserver
      let eventEmitterMock: EventEmitter
      let crashDumpService: CrashDumpService
      let settingsService: SettingsService

      beforeEach(() => {
        eventEmitterMock = new EventEmitter()
        const deviceService = {
          on: (eventName: DeviceServiceEventName, listener: () => void) => {
            eventEmitterMock.on(eventName, listener)
          },
        } as unknown as DeviceService
        crashDumpService = {
          getDeviceCrashDumpFiles: jest
            .fn()
            .mockReturnValue({ data: ["/sys/crash_dumps/crashdump.hex"] }),
        } as unknown as CrashDumpService
        settingsService = {
          getSettings: jest.fn().mockReturnValue({
            ignoredCrashDumps: ["/sys/crash_dumps/crashdump.hex"],
          }),
        } as unknown as SettingsService
        subject = new CrashDumpObserver(
          ipcMain,
          deviceService,
          crashDumpService,
          settingsService
        )
      })

      test("doesn't emits `IpcCrashDumpRenderedEvent.CrashDumpExists` event", async () => {
        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalledTimes(
          0
        )
        expect(settingsService.getSettings).toHaveBeenCalledTimes(0)

        subject.observe()
        eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

        await Promise.resolve().then(() => jest.advanceTimersByTime(100))

        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalled()
        expect(settingsService.getSettings).toHaveBeenCalled()

        expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
          IpcCrashDumpRenderedEvent.CrashDumpExists,
          ["/sys/crash_dumps/crashdump.hex"]
        )
      })
    })

    describe("when observe called multiple times", () => {
      let subject: CrashDumpObserver
      let eventEmitterMock: EventEmitter
      let crashDumpService: CrashDumpService
      let settingsService: SettingsService

      beforeEach(() => {
        eventEmitterMock = new EventEmitter()
        const deviceService = {
          on: (eventName: DeviceServiceEventName, listener: () => void) => {
            eventEmitterMock.on(eventName, listener)
          },
        } as unknown as DeviceService
        crashDumpService = {
          getDeviceCrashDumpFiles: jest
            .fn()
            .mockReturnValue({ data: ["/sys/crash_dumps/crashdump.hex"] }),
        } as unknown as CrashDumpService
        settingsService = {
          getSettings: jest.fn().mockReturnValue({
            ignoredCrashDumps: [],
          }),
        } as unknown as SettingsService
        subject = new CrashDumpObserver(
          ipcMain,
          deviceService,
          crashDumpService,
          settingsService
        )
      })

      test("emits `IpcCrashDumpRenderedEvent.CrashDumpExists` event only once", async () => {
        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalledTimes(
          0
        )
        expect(settingsService.getSettings).toHaveBeenCalledTimes(0)

        subject.observe()
        subject.observe()
        subject.observe()
        eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)

        await Promise.resolve().then(() => jest.advanceTimersByTime(100))

        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalledTimes(
          1
        )
        expect(settingsService.getSettings).toHaveBeenCalledTimes(1)
        expect((ipcMain as any).sendToRenderers).toHaveBeenCalledTimes(1)
      })
    })
  })
})
