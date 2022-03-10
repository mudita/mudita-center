/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "@mudita/pure"
import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { Observer } from "App/core/types"
import { ModelEvent } from "App/core/constants"
import {
  DeviceService,
  DeviceServiceEventName,
} from "App/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { MetadataKey } from "App/metadata/constants"
import { DataSyncService } from "App/data-sync/services/data-sync.service"
import { IpcEvent } from "App/data-sync/constants/ipc-event.constant"
import CryptoFileService from "App/file-system/services/crypto-file-service/crypto-file-service"

export class DeviceConnectionObserver implements Observer {
  private invoked = false

  constructor(
    private deviceService: DeviceService,
    private keyStorage: MetadataStore,
    private dataSyncService: DataSyncService,
    private ipc: MainProcessIpc,
    private eventEmitter: EventEmitter
  ) {}

  public observe(): void {
    this.registerListener()
  }

  private registerListener(): void {
    this.deviceService.on(DeviceServiceEventName.DeviceUnlocked, async () => {
      if (this.invoked) {
        return
      }

      this.invoked = true

      try {
        await this.ipc.sendToRenderers(IpcEvent.DataInitialized)

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

        const indexed = await new Promise((resolve) => {
          setTimeout(async () => {
            const result = await this.dataSyncService.indexAll()
            resolve(result)
          }, 1000)
        })

        if (indexed) {
          await this.ipc.sendToRenderers(IpcEvent.DataLoaded)
          await this.eventEmitter.emit(ModelEvent.Loaded)
        } else {
          await this.ipc.sendToRenderers(IpcEvent.DataError)
        }
      } catch (error) {
        await this.ipc.sendToRenderers(IpcEvent.DataError, error)
      }
    })

    this.deviceService.on(
      DeviceServiceEventName.DeviceDisconnected,
      async () => {
        this.invoked = false
      }
    )
  }
}
