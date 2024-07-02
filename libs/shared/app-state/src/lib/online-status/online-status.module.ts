/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { onlineStatusService } from "./online-status.service"

export class OnlineStatusModule {
  public controllers

  constructor() {
    this.controllers = [onlineStatusService]
  }
}
