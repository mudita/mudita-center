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
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import { FilesManagerController } from "App/files-manager/controllers"
import { FileManagerService } from "App/files-manager/services"
import {
  RetrieveFilesCommand,
  FileUploadCommand,
} from "App/device-file-system/commands"

export class FilesManagerModule extends BaseModule {
  private readonly filesManagerController: FilesManagerController

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

    const fileManagerService = new FileManagerService(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      new RetrieveFilesCommand(this.deviceService),
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      new FileUploadCommand(this.deviceService, this.fileSystem)
    )

    this.filesManagerController = new FilesManagerController(fileManagerService)

    this.controllers = [this.filesManagerController]
  }
}
