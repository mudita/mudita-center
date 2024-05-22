/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { IpcOnlineStatusEvent } from "./online-status.event"
import { OnlineStatusService } from "./online-status.service"

export class OnlineStatusController {
  constructor(private onlineStatusService: OnlineStatusService) {}

  @IpcEvent(IpcOnlineStatusEvent.UpdateOnlineStatus)
  public async updateOnlineStatus(value: boolean): Promise<void> {
    this.onlineStatusService.online = value
  }
}
