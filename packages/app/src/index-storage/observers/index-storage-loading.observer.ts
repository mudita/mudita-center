/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { ModelEvent } from "App/core/constants"
import { Observer } from "App/core/types"
import { Endpoint, Method, DeviceServiceEvent } from "App/device/constants"
import { GetDeviceInfoResponseBody } from "App/device/types/mudita-os"
import { MetadataStore } from "App/metadata/services"
import { MetadataKey } from "App/metadata/constants"
import { IndexStorageService } from "App/index-storage/services"
import { IpcEvent } from "App/data-sync/constants"
import { DeviceManager } from "App/device-manager/services"

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

      const { data } =
        await this.deviceManager.device.request<GetDeviceInfoResponseBody>({
          endpoint: Endpoint.DeviceInfo,
          method: Method.Get,
        })

      // const { data } = await getDeviceInfoRequest(this.deviceService)
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

      const restored = await this.indexStorageService.loadIndex()

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
