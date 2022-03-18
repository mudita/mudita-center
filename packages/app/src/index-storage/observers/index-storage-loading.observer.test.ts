/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IndexStorageLoadingObserver } from "./index-storage-loading.observer"
import { EventEmitter } from "events"
import { ipcMain } from "electron-better-ipc"
import DeviceService, { DeviceServiceEventName } from "Backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { IndexStorageService } from "App/index-storage/services/index-storage.service"
import { getDeviceInfoRequest } from "Backend/adapters/device-base-info/device-base-info.adapter"

jest.mock("Backend/adapters/device-base-info/device-base-info.adapter")

let subject: IndexStorageLoadingObserver
const eventEmitterMock = new EventEmitter()
const deviceService = {
  on: (eventName: DeviceServiceEventName, listener: () => void) => {
    eventEmitterMock.on(eventName, listener)
  },
} as unknown as DeviceService
const keyStorage = new MetadataStore()
const indexStorageService = {
  loadIndex: jest.fn(),
} as unknown as IndexStorageService

describe("Method: observe", () => {
  beforeEach(() => {
    subject = new IndexStorageLoadingObserver(
      deviceService,
      keyStorage,
      indexStorageService,
      ipcMain,
      eventEmitterMock
    )
  })

  test("calls the `DeviceService.request` and `IndexStorageService.loadIndex` methods when `DeviceServiceEventName.DeviceUnlocked` has been emitted", async () => {
    ;(getDeviceInfoRequest as unknown as jest.Mock).mockReturnValue({
      data: {
        deviceToken: "1234567890",
        serialNumber: "0000000000",
      },
    })
    expect(indexStorageService.loadIndex).toHaveBeenCalledTimes(0)
    expect(getDeviceInfoRequest).toHaveBeenCalledTimes(0)

    subject.observe()

    eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)
    await Promise.resolve()
    await Promise.resolve()
    expect(indexStorageService.loadIndex).toHaveBeenCalledTimes(1)
    expect(getDeviceInfoRequest).toHaveBeenCalledTimes(1)
  })
})
