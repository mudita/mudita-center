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
import { IndexStorageLoadingObserver } from "Core/index-storage/observers"
import { DeviceManager } from "Core/device-manager/services"

export class IndexStorageModule extends BaseModule {
  private indexStorageService: IndexStorageService
  private indexStorageLoadingObserver: IndexStorageLoadingObserver

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

    this.indexStorageService = new IndexStorageService(
      this.index,
      this.keyStorage,
      this.fileSystem
    )
    this.indexStorageLoadingObserver = new IndexStorageLoadingObserver(
      this.deviceManager,
      this.keyStorage,
      this.indexStorageService,
      this.ipc,
      this.eventEmitter
    )

    this.observers = [this.indexStorageLoadingObserver]
  }
}
