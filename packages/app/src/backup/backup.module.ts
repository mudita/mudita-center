/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "App/metadata/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import { DeviceFileSystemService } from "App/device-file-system/services"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import {
  BackupCreateService,
  BackupRestoreService,
  LoadBackupService,
} from "App/backup/services"
import { BackupController } from "App/backup/controllers"
import { DeviceManager } from "App/device-manager/services"

export class BackupModule extends BaseModule {
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

    const deviceFileSystem = new DeviceFileSystemService(this.deviceManager)
    const backupCreateService = new BackupCreateService(
      this.deviceManager,
      deviceFileSystem,
      this.keyStorage
    )
    const backupRestoreService = new BackupRestoreService(
      this.deviceManager,
      deviceFileSystem
    )
    const loadBackupService = new LoadBackupService()
    const backupController = new BackupController(
      backupCreateService,
      backupRestoreService,
      loadBackupService
    )

    this.controllers = [backupController]
  }
}
