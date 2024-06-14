/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocolService } from "device-protocol/feature"
import { DeviceManagerController } from "./controllers"

export class DeviceManagerModule {
  public controllers

  constructor(public deviceProtocolService: DeviceProtocolService) {
    const deviceManagerController = new DeviceManagerController(
      this.deviceProtocolService
    )

    this.controllers = [deviceManagerController]
  }
}
