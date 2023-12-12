/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDevice } from "Core/device/types/serial-port-device.type"
import { DeviceType, Endpoint, Method } from "Core/device/constants"
import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { Observer } from "Core/core/types"
import { ModelEvent } from "Core/core/constants"
import { MetadataStore } from "Core/metadata/services"
import { MetadataKey } from "Core/metadata/constants"
import { DataSyncService } from "Core/data-sync/services/data-sync.service"
import { IpcEvent } from "Core/data-sync/constants/ipc-event.constant"
import { DeviceServiceEvent } from "Core/device/constants"
import { DeviceManager } from "Core/device-manager/services"
import { GetDeviceInfoResponseBody } from "Core/device/types/mudita-os"

const corruptedPureOSVersions = ["1.5.1"]

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
      (device: SerialPortDevice) => {
        void (async () => {
          if (this.invoked) {
            return
          }
          this.invoked = true

          if (this.deviceManager.updating) {
            this.ipc.sendToRenderers(IpcEvent.DataSkipped)
            return
          }

          if (device.deviceType === DeviceType.MuditaHarmony) {
            this.ipc.sendToRenderers(IpcEvent.DataSkipped)
            return
          }

          if (this.keyStorage.getValue(MetadataKey.BackupInProgress)) {
            this.ipc.sendToRenderers(IpcEvent.DataSkipped)
            return
          }

          try {
            this.ipc.sendToRenderers(IpcEvent.DataLoading)

            const { data } = await this.deviceManager.device.request({
              endpoint: Endpoint.DeviceInfo,
              method: Method.Get,
            })

            if (data === undefined) {
              this.ipc.sendToRenderers(IpcEvent.DataError)
              return
            }

            const { serialNumber, deviceToken, version } =
              data as GetDeviceInfoResponseBody
            const baseVersion = String(version).split("-")[0]

            if (corruptedPureOSVersions.some((v) => v === baseVersion)) {
              this.ipc.sendToRenderers(IpcEvent.DataSkipped)
              return
            }

            this.keyStorage.setValue(
              MetadataKey.DeviceSerialNumber,
              serialNumber
            )
            this.keyStorage.setValue(MetadataKey.DeviceToken, deviceToken)

            const indexed = await this.dataSyncService.indexAll()

            if (indexed) {
              this.ipc.sendToRenderers(IpcEvent.DataLoaded)
              this.eventEmitter.emit(ModelEvent.Loaded)
            } else {
              this.ipc.sendToRenderers(IpcEvent.DataError)
            }
          } catch (error) {
            this.ipc.sendToRenderers(IpcEvent.DataError, error)
          }
        })()
      }
    )

    this.eventEmitter.on(DeviceServiceEvent.DeviceDisconnected, () => {
      this.invoked = false
    })
  }
}
