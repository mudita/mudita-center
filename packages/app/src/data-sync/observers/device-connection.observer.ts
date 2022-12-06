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
import { MetadataStore } from "App/metadata/services"
import { MetadataKey } from "App/metadata/constants"
import { DataSyncService } from "App/data-sync/services/data-sync.service"
import { IpcEvent } from "App/data-sync/constants/ipc-event.constant"
import { DeviceServiceEvent } from "App/device/constants"
import { DeviceManager } from "App/device-manager/services"
import { GetDeviceInfoResponseBody } from "App/device/types/mudita-os"

export class DeviceConnectionObserver implements Observer {
  private invoked = false

  constructor(
    private deviceManager: DeviceManager,
    private keyStorage: MetadataStore,
    private dataSyncService: DataSyncService,
    private ipc: MainProcessIpc,
    private eventEmitter: EventEmitter
  ) {}

  public observe(): void {
    this.registerListener()
  }

  private registerListener(): void {
    this.eventEmitter.on(
      DeviceServiceEvent.DeviceUnlocked,
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

          const { data } = await this.deviceManager.device.request({
            endpoint: Endpoint.DeviceInfo,
            method: Method.Get,
          })

          const { serialNumber, deviceToken } =
            data as GetDeviceInfoResponseBody

          if (data === undefined) {
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/await-thenable
            await this.ipc.sendToRenderers(IpcEvent.DataError)
            return
          }

          this.keyStorage.setValue(MetadataKey.DeviceSerialNumber, serialNumber)
          this.keyStorage.setValue(MetadataKey.DeviceToken, deviceToken)

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

    this.eventEmitter.on(
      DeviceServiceEvent.DeviceDisconnected,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await
      async () => {
        this.invoked = false
      }
    )
  }
}
