/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "Core/metadata/services"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { AppLogger } from "Core/__deprecated__/main/utils/logger"
import { DeviceFileSystemService } from "Core/device-file-system/services"
import { IndexStorage } from "Core/index-storage/types"
import { BaseModule } from "Core/core/module"
import {
  BackupCreateService,
  BackupRestoreService,
  LoadBackupService,
} from "Core/backup/services"
import { BackupController } from "Core/backup/controllers"
import { DeviceProtocol } from "device-protocol/feature"
import { FileManagerService } from "Core/files-manager/services"
import { FileDeleteCommand } from "Core/device-file-system/commands/file-delete.command"
import {
  FileUploadCommand,
  RetrieveFilesCommand,
} from "Core/device-file-system/commands"
import { DeviceInfoService } from "Core/device-info/services"

export class BackupModule extends BaseModule {
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

    const deviceFileSystem = new DeviceFileSystemService(this.deviceProtocol)
    const fileManagerService = new FileManagerService(
      this.deviceProtocol,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      new FileDeleteCommand(this.deviceProtocol),
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      new RetrieveFilesCommand(this.deviceProtocol),
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      new FileUploadCommand(this.deviceProtocol, this.fileSystem)
    )

    const deviceInfoService = new DeviceInfoService(this.deviceProtocol)

    const backupCreateService = new BackupCreateService(
      this.deviceProtocol,
      deviceFileSystem,
      fileManagerService,
      deviceInfoService,
      this.keyStorage
    )
    const backupRestoreService = new BackupRestoreService(
      this.deviceProtocol,
      deviceFileSystem,
      deviceInfoService,
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
