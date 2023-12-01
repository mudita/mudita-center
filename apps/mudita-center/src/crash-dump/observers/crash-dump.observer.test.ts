/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import { CrashDumpObserver } from "App/crash-dump/observers/crash-dump.observer"
import { CrashDumpService } from "App/crash-dump/services"
import { SettingsService } from "App/settings/services"
import { ipcMain } from "electron-better-ipc"
import { IpcCrashDumpRenderedEvent } from "App/crash-dump/constants"
import { DeviceServiceEvent } from "App/device/constants"

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
          eventEmitterMock,
          crashDumpService,
          settingsService
        )
      })

      test("calls `getDeviceCrashDumpFiles` and `getAppSettings` methods", async () => {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalledTimes(
          0
        )
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(settingsService.getSettings).toHaveBeenCalledTimes(0)

        subject.observe()
        eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked)

        await Promise.resolve().then(() => jest.advanceTimersByTime(100))

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalled()
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(settingsService.getSettings).toHaveBeenCalled()

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
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
          eventEmitterMock,
          crashDumpService,
          settingsService
        )
      })

      test("emits `IpcCrashDumpRenderedEvent.CrashDumpExists` event", async () => {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalledTimes(
          0
        )
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(settingsService.getSettings).toHaveBeenCalledTimes(0)

        subject.observe()
        eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked)

        await Promise.resolve().then(() => jest.advanceTimersByTime(100))

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalled()
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(settingsService.getSettings).toHaveBeenCalled()

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
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
          eventEmitterMock,
          crashDumpService,
          settingsService
        )
      })

      test("doesn't emits `IpcCrashDumpRenderedEvent.CrashDumpExists` event", async () => {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalledTimes(
          0
        )
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(settingsService.getSettings).toHaveBeenCalledTimes(0)

        subject.observe()
        eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked)

        await Promise.resolve().then(() => jest.advanceTimersByTime(100))

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalled()
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(settingsService.getSettings).toHaveBeenCalled()

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
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
          eventEmitterMock,
          crashDumpService,
          settingsService
        )
      })

      test("emits `IpcCrashDumpRenderedEvent.CrashDumpExists` event only once", async () => {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalledTimes(
          0
        )
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(settingsService.getSettings).toHaveBeenCalledTimes(0)

        subject.observe()
        subject.observe()
        subject.observe()
        eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked)

        await Promise.resolve().then(() => jest.advanceTimersByTime(100))

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(crashDumpService.getDeviceCrashDumpFiles).toHaveBeenCalledTimes(
          1
        )
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(settingsService.getSettings).toHaveBeenCalledTimes(1)
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        expect((ipcMain as any).sendToRenderers).toHaveBeenCalledTimes(1)
      })
    })
  })
})
