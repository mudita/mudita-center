/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Observer } from "App/core/types"
import {
  DeviceService,
  DeviceServiceEventName,
} from "App/backend/device-service"
import { OutboxService } from "App/outbox/services/outbox.service"
import { MainProcessIpc } from "electron-better-ipc"
import { IpcEvent } from "App/data-sync/constants"

export const outboxTime = 30000

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

    await this.outboxService.readOutboxEntries()
    this.ipc.sendToRenderers(IpcEvent.DataLoaded)
    return new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await this.watchOutboxEntries())
      }, outboxTime)
    })
  }
}
