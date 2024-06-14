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
import { DeviceProtocolService } from "device-protocol/feature"
import { DesktopController } from "Core/desktop/desktop.controller"
import { DesktopService } from "Core/desktop/desktop.service"

export class DesktopModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceProtocolService: DeviceProtocolService,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      deviceProtocolService,
      keyStorage,
      logger,
      ipc,
      eventEmitter,
      fileSystem
    )

    const desktopService = new DesktopService()
    const desktopController = new DesktopController(desktopService)

    this.controllers = [desktopController]
  }
}
