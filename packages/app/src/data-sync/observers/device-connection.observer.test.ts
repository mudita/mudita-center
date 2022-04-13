/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceConnectionObserver } from "./device-connection.observer"
import { EventEmitter } from "events"
import { ipcMain } from "electron-better-ipc"
import { DeviceType, MuditaDevice } from "@mudita/pure"
import DeviceService, { DeviceServiceEventName } from "Backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { DataSyncService } from "App/data-sync/services/data-sync.service"
import { getDeviceInfoRequest } from "Backend/adapters/device-base-info/device-base-info.adapter"
import { IpcEvent } from "App/data-sync/constants"
import { flushPromises } from "App/core/helpers/flush-promises"

jest.mock("Backend/adapters/device-base-info/device-base-info.adapter")

let subject: DeviceConnectionObserver
const eventEmitterMock = new EventEmitter()
const deviceService = {
  on: (eventName: DeviceServiceEventName, listener: () => void) => {
    eventEmitterMock.on(eventName, listener)
  },
} as unknown as DeviceService
const keyStorage = new MetadataStore()
let indexStorageService: DataSyncService

describe("Method: observe", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    indexStorageService = {
      indexAll: jest.fn().mockReturnValue(Promise.resolve(true)),
    } as unknown as DataSyncService
    subject = new DeviceConnectionObserver(
      deviceService,
      keyStorage,
      indexStorageService,
      ipcMain,
      eventEmitterMock
    )
  })

  describe("when the `DeviceUnlocked` event is emit with `MuditaPure` device type", () => {
    test("calls the `DeviceService.request` and `DataSyncService.indexAll` methods when `DeviceServiceEventName.DeviceUnlocked` has been emitted", async () => {
      ;(getDeviceInfoRequest as unknown as jest.Mock).mockReturnValue({
        data: {
          deviceToken: "1234567890",
          serialNumber: "0000000000",
        },
      })
      expect(indexStorageService.indexAll).toHaveBeenCalledTimes(0)
      expect(getDeviceInfoRequest).toHaveBeenCalledTimes(0)
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledTimes(0)

      subject.observe()

      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked, {
        deviceType: DeviceType.MuditaPure,
      } as MuditaDevice)
    await flushPromises()

      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
      expect(indexStorageService.indexAll).toHaveBeenCalledTimes(1)
      expect(getDeviceInfoRequest).toHaveBeenCalledTimes(1)
    })
  })

  describe("when the `DeviceUnlocked` event is emit with `MuditaHarmony` device type", () => {
    test("no run `indexAll` process and emit `DataLoaded` event", async () => {
      expect(indexStorageService.indexAll).toHaveBeenCalledTimes(0)
      expect(getDeviceInfoRequest).toHaveBeenCalledTimes(0)
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledTimes(0)
      subject.observe()

      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked, {
        deviceType: DeviceType.MuditaHarmony,
      } as MuditaDevice)

      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
      expect(indexStorageService.indexAll).not.toHaveBeenCalledTimes(1)
      expect(getDeviceInfoRequest).not.toHaveBeenCalledTimes(1)
    })
  })
})
