/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceConnectionObserver } from "./device-connection.observer"
import { EventEmitter } from "events"
import { ipcMain } from "electron-better-ipc"
import { DeviceManager } from "App/device-manager/services"
import { SerialPortDevice } from "App/device/types/serial-port-device.type"
import { DeviceType, DeviceServiceEvent } from "App/device/constants"
import { MetadataStore } from "App/metadata/services"
import { DataSyncService } from "App/data-sync/services/data-sync.service"
import { IpcEvent } from "App/data-sync/constants"
import { flushPromises } from "App/core/helpers/flush-promises"

let subject: DeviceConnectionObserver
const eventEmitterMock = new EventEmitter()
const deviceManager = {
  updating: false,
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceManager
const keyStorage = new MetadataStore()
let indexStorageService: DataSyncService

describe("Method: observe", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    indexStorageService = {
      indexAll: jest.fn().mockReturnValue(Promise.resolve(true)),
    } as unknown as DataSyncService
    subject = new DeviceConnectionObserver(
      deviceManager,
      keyStorage,
      indexStorageService,
      ipcMain,
      eventEmitterMock
    )
  })

  describe("when the `DeviceUnlocked` event is emit with `MuditaPure` device type", () => {
    test("calls the `DeviceService.request` and `DataSyncService.indexAll` methods when `DeviceServiceEventName.DeviceUnlocked` has been emitted", async () => {
      deviceManager.device.request = jest.fn().mockResolvedValueOnce({
        data: {
          deviceToken: "1234567890",
          serialNumber: "0000000000",
        },
      })

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(indexStorageService.indexAll).toHaveBeenCalledTimes(0)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalledTimes(0)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledTimes(0)

      subject.observe()

      eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked, {
        deviceType: DeviceType.MuditaPure,
      } as SerialPortDevice)
      await flushPromises()

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(indexStorageService.indexAll).toHaveBeenCalledTimes(1)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalledTimes(1)
    })
  })

  describe("when the `DeviceUnlocked` event is emit with `MuditaHarmony` device type", () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    test("no run `indexAll` process and emit `DataSkipped` event", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(indexStorageService.indexAll).toHaveBeenCalledTimes(0)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalledTimes(0)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledTimes(0)
      subject.observe()

      eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked, {
        deviceType: DeviceType.MuditaHarmony,
      } as SerialPortDevice)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
        IpcEvent.DataSkipped
      )
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(indexStorageService.indexAll).not.toHaveBeenCalledTimes(1)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).not.toHaveBeenCalledTimes(1)
    })
  })
})
