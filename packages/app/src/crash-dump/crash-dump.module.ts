/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { DeviceService } from "App/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { getAppSettingsService } from "App/app-settings/containers/app-settings.container"
import { DeviceFileSystem } from "App/backend/adapters/device-file-system/device-file-system.adapter"
import { AppLogger } from "App/main/utils/logger"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import { CrashDumpController } from "App/crash-dump/controllers"
import { CrashDumpService } from "App/crash-dump/services"
import { CrashDumpObserver } from "App/crash-dump/observers"

export class CrashDumpModule extends BaseModule {
  private crashDumpController: CrashDumpController
  private crashDumpService: CrashDumpService
  private crashDumpObserver: CrashDumpObserver

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

    const appSettingsService = getAppSettingsService()

    if (appSettingsService === undefined) {
      throw new Error("Initialize `AppSettingsService` before get it")
    }

    this.crashDumpService = new CrashDumpService(
      this.deviceService,
      new DeviceFileSystem(this.deviceService)
    )
    this.crashDumpController = new CrashDumpController(
      this.crashDumpService,
      appSettingsService
    )
    this.crashDumpObserver = new CrashDumpObserver(
      this.ipc,
      this.deviceService,
      this.crashDumpService,
      appSettingsService
    )

    this.controllers = [this.crashDumpController]
    this.observers = [this.crashDumpObserver]
  }
}
