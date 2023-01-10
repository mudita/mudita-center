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
import { FileManagerService } from "App/files-manager/services"
import { FileDeleteCommand } from "App/device-file-system/commands/file-delete.command"
import {
  FileUploadCommand,
  RetrieveFilesCommand,
} from "App/device-file-system/commands"

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
    const fileManagerService = new FileManagerService(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      new FileDeleteCommand(this.deviceManager),
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      new RetrieveFilesCommand(this.deviceManager),
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      new FileUploadCommand(this.deviceManager, this.fileSystem)
    )
    const backupCreateService = new BackupCreateService(
      this.deviceManager,
      deviceFileSystem,
      fileManagerService,
      this.keyStorage
    )
    const backupRestoreService = new BackupRestoreService(
      this.deviceManager,
      deviceFileSystem,
      fileSystem
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
