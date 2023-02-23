/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "App/metadata/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { getSettingsService } from "App/settings/containers/settings.container"
import { DeviceFileSystemService } from "App/device-file-system/services"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import { CrashDumpController } from "App/crash-dump/controllers"
import { CrashDumpService } from "App/crash-dump/services"
import { CrashDumpObserver } from "App/crash-dump/observers"
import { DeviceManager } from "App/device-manager/services"

export class CrashDumpModule extends BaseModule {
  private crashDumpController: CrashDumpController
  private crashDumpService: CrashDumpService
  private crashDumpObserver: CrashDumpObserver

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

    const settingsService = getSettingsService()

    if (settingsService === undefined) {
      throw new Error("Initialize `SettingsService` before get it")
    }

    this.crashDumpService = new CrashDumpService(
      this.deviceManager,
      new DeviceFileSystemService(this.deviceManager)
    )
    this.crashDumpController = new CrashDumpController(
      this.crashDumpService,
      settingsService
    )
    this.crashDumpObserver = new CrashDumpObserver(
      this.ipc,
      this.eventEmitter,
      this.crashDumpService,
      settingsService
    )

    this.controllers = [this.crashDumpController]
    this.observers = [this.crashDumpObserver]
  }
}
