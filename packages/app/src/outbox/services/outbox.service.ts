/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, OutboxCategory } from "@mudita/pure"
import { MainProcessIpc } from "electron-better-ipc"
import { DeviceService } from "App/backend/device-service"
import { IpcEvent } from "App/data-sync/constants"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

export class OutboxService {
  constructor(
    private deviceService: DeviceService,
    private ipc: MainProcessIpc
  ) {}

  public async readOutboxEntries(): Promise<void> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Outbox,
      method: Method.Get,
      body: {
        category: OutboxCategory.Entries,
      },
    })

    const entries = data?.entries

    if (status === DeviceResponseStatus.Ok && entries !== undefined) {
      if (entries.length > 0) {
        await this.ipc.sendToRenderers(IpcEvent.DataLoaded)
      }
    }
  }
}
