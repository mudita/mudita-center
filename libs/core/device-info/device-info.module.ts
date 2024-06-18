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
import { DeviceInfoService } from "Core/device-info/services"
import { DeviceInfoController } from "Core/device-info/controllers"
import { DeviceProtocol } from "device-protocol/feature"

export class DeviceInfoModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceProtocol: DeviceProtocol,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      deviceProtocol,
      keyStorage,
      logger,
      ipc,
      eventEmitter,
      fileSystem
    )

    const deviceInfoService = new DeviceInfoService(this.deviceProtocol)
    const deviceInfoController = new DeviceInfoController(deviceInfoService)

    this.controllers = [deviceInfoController]
  }
}
