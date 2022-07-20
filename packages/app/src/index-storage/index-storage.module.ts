/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { DeviceService } from "App/__deprecated__/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import { IndexStorageService } from "App/index-storage/services"
import { IndexStorageLoadingObserver } from "App/index-storage/observers"

export class IndexStorageModule extends BaseModule {
  private indexStorageService: IndexStorageService
  private indexStorageLoadingObserver: IndexStorageLoadingObserver

  constructor(
    public index: IndexStorage,
    public deviceService: DeviceService,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      deviceService,
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
    this.indexStorageLoadingObserver = new IndexStorageLoadingObserver(
      this.deviceService,
      this.keyStorage,
      this.indexStorageService,
      this.ipc,
      this.eventEmitter
    )

    this.observers = [this.indexStorageLoadingObserver]
  }
}
