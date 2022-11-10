/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDevice } from "App/device/types/serial-port-device.type"
import { DeviceType, Endpoint, Method } from "App/device/constants"
import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { Observer } from "App/core/types"
import { ModelEvent } from "App/core/constants"
import {
  DeviceService,
  DeviceServiceEventName,
} from "App/__deprecated__/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { MetadataKey } from "App/metadata/constants"
import { DataSyncService } from "App/data-sync/services/data-sync.service"
import { IpcEvent } from "App/data-sync/constants/ipc-event.constant"

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
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async (device: SerialPortDevice) => {
        if (this.invoked) {
          return
        }
        this.invoked = true

        if (device.deviceType === DeviceType.MuditaHarmony) {
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/await-thenable
          await this.ipc.sendToRenderers(IpcEvent.DataSkipped)
          return
        }

        try {
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/await-thenable
          await this.ipc.sendToRenderers(IpcEvent.DataLoading)

          const { data } = await this.deviceService.request({
            endpoint: Endpoint.DeviceInfo,
            method: Method.Get,
          })

          if (data === undefined) {
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/await-thenable
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
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/await-thenable
            await this.ipc.sendToRenderers(IpcEvent.DataLoaded)
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/await-thenable
            await this.eventEmitter.emit(ModelEvent.Loaded)
          } else {
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/await-thenable
            await this.ipc.sendToRenderers(IpcEvent.DataError)
          }
        } catch (error) {
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/await-thenable
          await this.ipc.sendToRenderers(IpcEvent.DataError, error)
        }
      }
    )

    this.deviceService.on(
      DeviceServiceEventName.DeviceDisconnected,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await
      async () => {
        this.invoked = false
      }
    )
  }
}
