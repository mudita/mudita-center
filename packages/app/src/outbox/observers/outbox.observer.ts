/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Observer } from "App/core/types"
import {
  DeviceService,
  DeviceServiceEventName,
} from "App/__deprecated__/backend/device-service"
import { OutboxService } from "App/outbox/services/outbox.service"
import { MainProcessIpc } from "electron-better-ipc"
import { IpcEvent as DataSyncIpcEvent } from "App/data-sync/constants"
import { IpcEvent as NotificationIpcEvent } from "App/notification/constants"

export const outboxTime = 10000

export class OutboxObserver implements Observer {
  private invoked = false
  private disconnected = true

  constructor(
    private ipc: MainProcessIpc,
    private deviceService: DeviceService,
    private outboxService: OutboxService
  ) {}

  public observe(): void {
    this.registerListener()
  }

  private registerListener(): void {
    this.deviceService.on(DeviceServiceEventName.DeviceUnlocked, async () => {
      this.disconnected = false

      if (this.invoked) {
        return
      }

      this.invoked = true

      await this.watchOutboxEntries()
    })

    this.deviceService.on(
      DeviceServiceEventName.DeviceDisconnected,
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
      setTimeout(async () => {
        resolve(await this.watchOutboxEntries())
      }, outboxTime)
    })
  }
}
