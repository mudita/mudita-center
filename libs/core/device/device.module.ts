/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "Core/metadata/services"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { AppLogger } from "Core/__deprecated__/main/utils/logger"
import { IndexStorage } from "Core/index-storage/types"
import { BaseModule } from "Core/core/module"
import { DeviceService } from "Core/device/services"
import { DeviceController } from "Core/device/controllers"
import { DeviceProtocolService } from "device-protocol/feature"

export class DeviceModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceManager: DeviceProtocolService,
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

    const deviceService = new DeviceService(this.deviceManager)
    const deviceController = new DeviceController(deviceService)

    this.controllers = [deviceController]
  }
}
