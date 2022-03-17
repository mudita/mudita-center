/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "@mudita/pure"
import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { ModelEvent } from "App/core/constants"
import { Observer } from "App/core/types"
import {
  DeviceService,
  DeviceServiceEventName,
} from "App/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { MetadataKey } from "App/metadata/constants"
import { IndexStorageService } from "App/index-storage/services"
import { IpcEvent } from "App/data-sync/constants"
import CryptoFileService from "App/file-system/services/crypto-file-service/crypto-file-service"

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

      // TODO move those logic to DeviceModule
      const deviceInfo = await this.deviceService.request({
        endpoint: Endpoint.DeviceInfo,
        method: Method.Get,
      })

      if (!deviceInfo.data?.deviceToken) {
        return
      }

      const token = CryptoFileService.createToken({
        key: deviceInfo.data.deviceToken,
      })

      this.keyStorage.setValue(
        MetadataKey.DeviceSerialNumber,
        deviceInfo.data?.serialNumber
      )
      this.keyStorage.setValue(MetadataKey.DeviceToken, token)

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
