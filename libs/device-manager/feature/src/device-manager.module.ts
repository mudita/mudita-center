/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { DeviceManagerController } from "./controllers"

export class DeviceManagerModule {
  public controllers

  constructor(public deviceProtocol: DeviceProtocol) {
    const deviceManagerController = new DeviceManagerController(
      this.deviceProtocol
    )

    this.controllers = [deviceManagerController]
  }
}
