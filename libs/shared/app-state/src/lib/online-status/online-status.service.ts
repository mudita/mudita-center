/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { IpcOnlineStatusEvent } from "./online-status.event"

export interface IOnlineStatusService {
  online: boolean;
}

class OnlineStatusService implements IOnlineStatusService {
  private _online: boolean = false

  get online(): boolean {
    return this._online
  }

  @IpcEvent(IpcOnlineStatusEvent.UpdateOnlineStatus)
  updateOnlineStatus(value: boolean) {
    this._online = value
  }
}

export const onlineStatusService = new OnlineStatusService()
