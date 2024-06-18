/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocolService } from "device-protocol/feature"
import { ActiveDeviceRegistryController } from "./controllers"

export class ActiveDeviceRegistryModule {
  public controllers

  constructor(public deviceProtocolService: DeviceProtocolService) {
    const activeDeviceRegistryController = new ActiveDeviceRegistryController(
      this.deviceProtocolService
    )

    this.controllers = [activeDeviceRegistryController]
  }
}
