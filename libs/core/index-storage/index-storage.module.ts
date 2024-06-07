/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "Core/metadata/services"
import { AppLogger } from "Core/__deprecated__/main/utils/logger"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { IndexStorage } from "Core/index-storage/types"
import { BaseModule } from "Core/core/module"
import { IndexStorageService } from "Core/index-storage/services"
import { DeviceProtocolService } from "device-protocol/feature"
import { IndexStorageController } from "Core/index-storage/controllers"

export class IndexStorageModule extends BaseModule {
  private indexStorageService: IndexStorageService
  private indexStorageController: IndexStorageController

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

    this.indexStorageService = new IndexStorageService(
      this.index,
      this.keyStorage,
      this.fileSystem
    )

    this.indexStorageController = new IndexStorageController(
      this.indexStorageService
    )

    this.controllers = [this.indexStorageController]

    this.observers = []
  }
}
