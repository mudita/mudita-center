/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HelpService } from "./help.service"
import { BaseModule } from "Core/core/module"
import { IndexStorage } from "Core/index-storage/types"
import { DeviceProtocol } from "device-protocol/feature"
import { MetadataStore } from "Core/metadata"
import { AppLogger } from "Core/__deprecated__/main/utils/logger"
import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { BrowserWindow } from "electron"

export class HelpModule extends BaseModule {
  public controllers: HelpService[]

  constructor(
    public index: IndexStorage,
    public deviceProtocol: DeviceProtocol,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService,
    public mainApplicationWindow: BrowserWindow
  ) {
    super(
      index,
      deviceProtocol,
      keyStorage,
      logger,
      ipc,
      eventEmitter,
      fileSystem,
      mainApplicationWindow
    )
    if (process.env.NEW_HELP_ENABLED === "1") {
      const helpService = new HelpService(mainApplicationWindow)
      void helpService.initialize()
      this.controllers = [helpService]
    } else {
      this.controllers = []
    }
  }
}
