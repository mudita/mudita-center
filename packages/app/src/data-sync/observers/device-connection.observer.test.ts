/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceConnectionObserver } from "./device-connection.observer"
import { EventEmitter } from "events"
import { ipcMain } from "electron-better-ipc"
import { SerialPortDevice } from "App/device/types/serial-port-device.type"
import { DeviceType } from "App/device/constants"
import DeviceService, {
  DeviceServiceEventName,
} from "App/__deprecated__/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { DataSyncService } from "App/data-sync/services/data-sync.service"
import { getDeviceInfoRequest } from "App/__deprecated__/backend/adapters/device-base-info/device-base-info.adapter"
import { IpcEvent } from "App/data-sync/constants"
import { flushPromises } from "App/core/helpers/flush-promises"

jest.mock(
  "App/__deprecated__/backend/adapters/device-base-info/device-base-info.adapter"
)

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
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(indexStorageService.indexAll).toHaveBeenCalledTimes(0)
      expect(getDeviceInfoRequest).toHaveBeenCalledTimes(0)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledTimes(0)

      subject.observe()

      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked, {
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
      expect(getDeviceInfoRequest).toHaveBeenCalledTimes(1)
    })
  })

  describe("when the `DeviceUnlocked` event is emit with `MuditaHarmony` device type", () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    test("no run `indexAll` process and emit `DataSkipped` event", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(indexStorageService.indexAll).toHaveBeenCalledTimes(0)
      expect(getDeviceInfoRequest).toHaveBeenCalledTimes(0)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledTimes(0)
      subject.observe()

      eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked, {
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
      expect(getDeviceInfoRequest).not.toHaveBeenCalledTimes(1)
    })
  })
})
