/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IndexStorageLoadingObserver } from "./index-storage-loading.observer"
import { EventEmitter } from "events"
import { ipcMain } from "electron-better-ipc"
import DeviceService, {
  DeviceServiceEventName,
} from "App/__deprecated__/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { IndexStorageService } from "App/index-storage/services/index-storage.service"
import { flushPromises } from "App/core/helpers/flush-promises"

let subject: IndexStorageLoadingObserver
const eventEmitterMock = new EventEmitter()
const deviceService = {
  request: jest.fn(),
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
    deviceService.request = jest.fn().mockResolvedValueOnce({
      data: {
        deviceToken: "1234567890",
        serialNumber: "0000000000",
      },
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(indexStorageService.loadIndex).toHaveBeenCalledTimes(0)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceService.request).toHaveBeenCalledTimes(0)

    subject.observe()

    eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)
    await flushPromises()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(indexStorageService.loadIndex).toHaveBeenCalledTimes(1)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceService.request).toHaveBeenCalledTimes(1)
  })
})
