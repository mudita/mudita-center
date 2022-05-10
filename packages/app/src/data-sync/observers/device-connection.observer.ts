/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType, MuditaDevice } from "@mudita/pure"
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
import { getDeviceInfoRequest } from "Backend/adapters/device-base-info/device-base-info.adapter"

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
    this.deviceService.on(
      DeviceServiceEventName.DeviceUnlocked,
      async (device: MuditaDevice) => {
        if (this.invoked) {
          return
        }
        this.invoked = true

        if (device.deviceType === DeviceType.MuditaHarmony) {
          await this.ipc.sendToRenderers(IpcEvent.DataSkipped)
          return
        }

        try {
          await this.ipc.sendToRenderers(IpcEvent.DataLoading)

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

          const indexed = await this.dataSyncService.indexAll()

          if (indexed) {
            await this.ipc.sendToRenderers(IpcEvent.DataLoaded)
            await this.eventEmitter.emit(ModelEvent.Loaded)
          } else {
            await this.ipc.sendToRenderers(IpcEvent.DataError)
          }
        } catch (error) {
          await this.ipc.sendToRenderers(IpcEvent.DataError, error)
        }
      }
    )

    this.deviceService.on(
      DeviceServiceEventName.DeviceDisconnected,
      async () => {
        this.invoked = false
      }
    )
  }
}
