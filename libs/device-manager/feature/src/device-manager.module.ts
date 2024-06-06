/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocolService } from "device-protocol/feature"
import { DeviceManagerController } from "./controllers"

export class DeviceManagerModule {
  public controllers

  constructor(public deviceManager: DeviceProtocolService) {
    const deviceManagerController = new DeviceManagerController(
      this.deviceManager
    )

    this.controllers = [deviceManagerController]
  }
}
