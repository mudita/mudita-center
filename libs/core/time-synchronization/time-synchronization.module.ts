/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BaseModule } from "Core/core/module"
import { IndexStorage } from "Core/index-storage/types"
import { DeviceProtocol } from "device-protocol/feature"
import { MetadataStore } from "Core/metadata"
import { AppLogger } from "Core/__deprecated__/main/utils/logger"
import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { TimeSynchronizationService } from "./services/time-synchronization.service"
import { TimeSynchronizationController } from "./controllers/time-synchronization.controller"

export class TimeSynchronizationModule extends BaseModule {
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

    const timeSynchronizationService = new TimeSynchronizationService(
      this.deviceProtocol
    )
    const timeSynchronizationController = new TimeSynchronizationController(
      timeSynchronizationService
    )

    this.controllers = [timeSynchronizationController]
  }
}
