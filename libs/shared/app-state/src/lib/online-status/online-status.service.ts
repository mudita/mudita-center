/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export class OnlineStatusService {
  private _online: boolean = false

  get online(): boolean {
    return this._online
  }

  set online(value: boolean) {
    this._online = value
  }
}

export const onlineStatusService = new OnlineStatusService()
