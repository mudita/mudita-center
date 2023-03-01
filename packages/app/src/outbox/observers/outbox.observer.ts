/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import { MainProcessIpc } from "electron-better-ipc"
import { Observer } from "App/core/types"
import { DeviceServiceEvent, DeviceType } from "App/device/constants"
import { OutboxService } from "App/outbox/services/outbox.service"
import { IpcEvent as DataSyncIpcEvent } from "App/data-sync/constants"
import { IpcEvent as NotificationIpcEvent } from "App/notification/constants"
import { SerialPortDevice } from "App/device/types/serial-port-device.type"

export const outboxTime = 10000

export class OutboxObserver implements Observer {
  private invoked = false
  private disconnected = true

  constructor(
    private ipc: MainProcessIpc,
    private eventEmitter: EventEmitter,
    private outboxService: OutboxService
  ) {}

  public observe(): void {
    this.registerListener()
  }

  private registerListener(): void {
    this.eventEmitter.on(
      DeviceServiceEvent.DeviceUnlocked,
      (device: SerialPortDevice) => {
        void (async () => {
          if (device.deviceType === DeviceType.MuditaHarmony) {
            return
          }

          this.disconnected = false

          if (this.invoked) {
            return
          }

          this.invoked = true

          await this.watchOutboxEntries()
        })()
      }
    )

    this.eventEmitter.on(
      DeviceServiceEvent.DeviceDisconnected,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await
      async () => {
        this.invoked = false
        this.disconnected = true
      }
    )
  }

  private async watchOutboxEntries(): Promise<void> {
    if (this.disconnected) {
      return
    }

    const updatedData = await this.outboxService.readOutboxEntries()

    if (updatedData) {
      this.ipc.sendToRenderers(DataSyncIpcEvent.DataUpdated)
      this.ipc.sendToRenderers(
        NotificationIpcEvent.PushOutboxNotification,
        updatedData
      )
    }
    return new Promise((resolve) => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      setTimeout(async () => {
        resolve(await this.watchOutboxEntries())
      }, outboxTime)
    })
  }
}
