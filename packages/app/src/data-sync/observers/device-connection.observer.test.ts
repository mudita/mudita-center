/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceConnectionObserver } from "./device-connection.observer"
import { EventEmitter } from "events"
import { ipcMain } from "electron-better-ipc"
import DeviceService, { DeviceServiceEventName } from "Backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { DataSyncService } from "App/data-sync/services/data-sync.service"

let subject: DeviceConnectionObserver
const eventEmitterMock = new EventEmitter()
const deviceService = {
  request: jest.fn().mockReturnValue({
    data: {
      deviceToken: "0000000000",
      serialNumber: "0000000000",
    },
  }),
  on: (eventName: DeviceServiceEventName, listener: () => void) => {
    eventEmitterMock.on(eventName, listener)
  },
} as unknown as DeviceService
const keyStorage = new MetadataStore()
const indexStorageService = {
  indexAll: jest.fn().mockReturnValue(true),
} as unknown as DataSyncService

describe("Method: observe", () => {
  beforeEach(() => {
    subject = new DeviceConnectionObserver(
      deviceService,
      keyStorage,
      indexStorageService,
      ipcMain,
      eventEmitterMock
    )
  })

  test("calls the `DeviceService.request` and `DataSyncService.indexAll` methods when `DeviceServiceEventName.DeviceUnlocked` has been emitted", async () => {
    expect(indexStorageService.indexAll).toHaveBeenCalledTimes(0)
    expect(deviceService.request).toHaveBeenCalledTimes(0)

    subject.observe()

    await eventEmitterMock.emit(DeviceServiceEventName.DeviceUnlocked)
    await new Promise((resolve) => setTimeout(resolve, 200))

    expect(indexStorageService.indexAll).toHaveBeenCalledTimes(1)
    expect(deviceService.request).toHaveBeenCalledTimes(1)
  })
})
