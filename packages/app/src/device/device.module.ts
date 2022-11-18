/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { DeviceService as LegacyDeviceService } from "App/__deprecated__/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import { DeviceService } from "App/device/services"
import { DeviceController } from "App/device/controllers"

export class DeviceModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public legacyDeviceService: LegacyDeviceService,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      legacyDeviceService,
      keyStorage,
      logger,
      ipc,
      eventEmitter,
      fileSystem
    )

    const deviceService = new DeviceService(legacyDeviceService)
    const deviceController = new DeviceController(deviceService)

    this.controllers = [deviceController]
  }
}
