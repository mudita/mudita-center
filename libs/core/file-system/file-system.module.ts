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
import { FilesSystemDialogService } from "Core/file-system/services"
import { DialogFileSystemController } from "Core/file-system/controllers"
import { DeviceManager } from "Core/device-manager/services"
import { BrowserWindow } from "electron"

export class FileSystemModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceManager: DeviceManager,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService,
    public mainApplicationWindow: BrowserWindow
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

    const filesSystemDialogService = new FilesSystemDialogService(
      this.mainApplicationWindow
    )
    const dialogFileSystemController = new DialogFileSystemController(
      filesSystemDialogService
    )

    this.controllers = [dialogFileSystemController]
  }
}
