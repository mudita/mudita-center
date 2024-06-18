/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { ActiveDeviceRegistryController } from "./controllers"

export class ActiveDeviceRegistryModule {
  public controllers

  constructor(public deviceProtocol: DeviceProtocol) {
    const activeDeviceRegistryController = new ActiveDeviceRegistryController(
      this.deviceProtocol
    )

    this.controllers = [activeDeviceRegistryController]
  }
}
