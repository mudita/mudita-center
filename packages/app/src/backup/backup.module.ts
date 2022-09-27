/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { DeviceService } from "App/__deprecated__/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import createDeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system.adapter"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import {
  BackupCreateService,
  BackupRestoreService,
  LoadBackupService,
} from "App/backup/services"
import { BackupController } from "App/backup/controllers"

export class BackupModule extends BaseModule {
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

    const deviceFileSystem = createDeviceFileSystemAdapter(this.deviceService)
    const backupCreateService = new BackupCreateService(
      this.deviceService,
      deviceFileSystem,
      this.keyStorage
    )
    const backupRestoreService = new BackupRestoreService(
      this.deviceService,
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
