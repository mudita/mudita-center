/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "App/metadata/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import { DeviceFileSystemService } from "App/device-file-system/services"
import { DeviceLogService } from "App/device-log/services"
import { DeviceLogController } from "App/device-log/controllers"
import { DeviceManager } from "App/device-manager/services"

export class DeviceLogModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceManager: DeviceManager,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      deviceManager,
      keyStorage,
      logger,
      ipc,
      eventEmitter,
      fileSystem
    )

    const deviceLogService = new DeviceLogService(
      this.deviceManager,
      new DeviceFileSystemService(this.deviceManager)
    )
    const deviceLogController = new DeviceLogController(deviceLogService)

    this.controllers = [deviceLogController]
  }
}
