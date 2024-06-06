/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocolService } from "device-protocol/feature"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { DeviceCacheConfigurationService } from "./services"
import { CoreDeviceController } from "./controllers"

export class CoreDeviceModule {
  public controllers

  constructor(
    public deviceManager: DeviceProtocolService,
    public fileSystem: FileSystemService
  ) {
    const deviceManagerController = new CoreDeviceController(
      this.deviceManager,
      new DeviceCacheConfigurationService(this.fileSystem)
    )

    this.controllers = [deviceManagerController]
  }
}
