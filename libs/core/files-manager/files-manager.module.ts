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
import { FilesManagerController } from "Core/files-manager/controllers"
import { FileManagerService } from "Core/files-manager/services"
import {
  RetrieveFilesCommand,
  FileUploadCommand,
} from "Core/device-file-system/commands"
import { FileDeleteCommand } from "Core/device-file-system/commands/file-delete.command"
import { DeviceProtocol } from "device-protocol/feature"
import { DeviceInfoService } from "Core/device-info/services"

export class FilesManagerModule extends BaseModule {
  private readonly filesManagerController: FilesManagerController

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
      new FileUploadCommand(
        this.deviceProtocol,
        this.fileSystem,
        new DeviceInfoService(this.deviceProtocol)
      )
    )

    this.filesManagerController = new FilesManagerController(fileManagerService)

    this.controllers = [this.filesManagerController]
  }
}
