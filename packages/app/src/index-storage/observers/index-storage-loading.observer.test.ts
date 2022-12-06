/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IndexStorageLoadingObserver } from "./index-storage-loading.observer"
import { EventEmitter } from "events"
import { ipcMain } from "electron-better-ipc"
import { DeviceManager } from "App/device-manager/services"
import { MetadataStore } from "App/metadata/services"
import { IndexStorageService } from "App/index-storage/services/index-storage.service"
import { flushPromises } from "App/core/helpers/flush-promises"
import { DeviceServiceEvent } from "App/device/constants"

let subject: IndexStorageLoadingObserver
const eventEmitterMock = new EventEmitter()
const deviceManager = {
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceManager
const keyStorage = new MetadataStore()
const indexStorageService = {
  loadIndex: jest.fn(),
} as unknown as IndexStorageService

describe("Method: observe", () => {
  beforeEach(() => {
    subject = new IndexStorageLoadingObserver(
      deviceManager,
      keyStorage,
      indexStorageService,
      ipcMain,
      eventEmitterMock
    )
  })

  test("calls the `DeviceService.request` and `IndexStorageService.loadIndex` methods when `DeviceServiceEvent.DeviceUnlocked` has been emitted", async () => {
    deviceManager.device.request = jest.fn().mockResolvedValueOnce({
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
    expect(deviceManager.device.request).toHaveBeenCalledTimes(0)

    subject.observe()

    eventEmitterMock.emit(DeviceServiceEvent.DeviceUnlocked)
    await flushPromises()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(indexStorageService.loadIndex).toHaveBeenCalledTimes(1)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).toHaveBeenCalledTimes(1)
  })
})
