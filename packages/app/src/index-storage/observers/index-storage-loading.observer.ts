/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { ModelEvent } from "App/core/constants"
import { Observer } from "App/core/types"
import {
  DeviceService,
  DeviceServiceEventName,
} from "App/__deprecated__/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { MetadataKey } from "App/metadata/constants"
import { IndexStorageService } from "App/index-storage/services"
import { IpcEvent } from "App/data-sync/constants"
import { getDeviceInfoRequest } from "App/__deprecated__/backend/adapters/device-base-info/device-base-info.adapter"

export class IndexStorageLoadingObserver implements Observer {
  private invoked = false

  constructor(
    private deviceService: DeviceService,
    private keyStorage: MetadataStore,
    private indexStorageService: IndexStorageService,
    private ipc: MainProcessIpc,
    private eventEmitter: EventEmitter
  ) {}

  public observe(): void {
    this.registerListeners()
    this.deviceService.on(DeviceServiceEventName.DeviceUnlocked, async () => {
      if (this.invoked) {
        return
      }
      this.invoked = true

      const { data } = await getDeviceInfoRequest(this.deviceService)
      if (data === undefined) {
        await this.ipc.sendToRenderers(IpcEvent.DataError)
        return
      }

      this.keyStorage.setValue(
        MetadataKey.DeviceSerialNumber,
        data.serialNumber
      )
      this.keyStorage.setValue(MetadataKey.DeviceToken, data.deviceToken)

      const restored = await this.indexStorageService.loadIndex()

      if (restored) {
        await this.ipc.sendToRenderers(IpcEvent.DataRestored)
      }
    })

    this.deviceService.on(
      DeviceServiceEventName.DeviceDisconnected,
      async () => {
        this.invoked = false
      }
    )
  }

  private registerListeners(): void {
    this.eventEmitter.on(ModelEvent.Loaded, () => {
      this.indexStorageService.saveIndex()
    })
    this.eventEmitter.on(ModelEvent.Created, () => {
      this.indexStorageService.saveIndex()
    })
    this.eventEmitter.on(ModelEvent.Updated, () => {
      this.indexStorageService.saveIndex()
    })
    this.eventEmitter.on(ModelEvent.Deleted, () => {
      this.indexStorageService.saveIndex()
    })
  }
}
