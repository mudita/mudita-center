/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { ModelEvent } from "Core/core/constants"
import { Observer } from "Core/core/types"
import { Endpoint, Method, DeviceServiceEvent } from "Core/device/constants"
import { GetDeviceInfoResponseBody } from "Core/device/types/mudita-os"
import { MetadataStore } from "Core/metadata/services"
import { MetadataKey } from "Core/metadata/constants"
import { IndexStorageService } from "Core/index-storage/services"
import { IpcEvent } from "Core/data-sync/constants"
import { DeviceManager } from "Core/device-manager/services"
import { DeviceType } from "Core/device"

export class IndexStorageLoadingObserver implements Observer {
  private invoked = false

  constructor(
    private deviceManager: DeviceManager,
    private keyStorage: MetadataStore,
    private indexStorageService: IndexStorageService,
    private ipc: MainProcessIpc,
    private eventEmitter: EventEmitter
  ) {}

  public observe(): void {
    this.registerListeners()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.eventEmitter.on(DeviceServiceEvent.DeviceUnlocked, async () => {
      if (this.invoked) {
        return
      }
      this.invoked = true

      const result =
        await this.deviceManager.device.request<GetDeviceInfoResponseBody>({
          endpoint: Endpoint.DeviceInfo,
          method: Method.Get,
        })

      if (!result.ok) {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await this.ipc.sendToRenderers(IpcEvent.DataError)
        return
      }

      this.keyStorage.setValue(
        MetadataKey.DeviceSerialNumber,
        result.data.serialNumber
      )
      this.keyStorage.setValue(MetadataKey.DeviceToken, result.data.deviceToken)

      //CP-1668 - when connecting Kompact there is no need to read indexes :)
      const restored =
        this.deviceManager.currentDevice?.deviceType ===
        DeviceType.MuditaKompakt
          ? true
          : await this.indexStorageService.loadIndex()

      if (restored) {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await this.ipc.sendToRenderers(IpcEvent.DataRestored)
      }
    })

    this.eventEmitter.on(
      DeviceServiceEvent.DeviceDisconnected,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await
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
