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

export class OutboxObserver implements Observer {
  private invoked = false
  private disconnected = true

  constructor(
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
    return new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await this.watchOutboxEntries())
      }, 1000)
    })
  }
}
