/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow } from "electron"
import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
// TODO change module name to `KeyStorage`
import { MetadataStore } from "Core/metadata/services"
import logger from "Core/__deprecated__/main/utils/logger"
import { LoggerFactory } from "Core/core/factories"
import { DeviceLogger } from "Core/core/types"
import { flags, Feature } from "Core/feature-flags"
import PureLogger from "Core/__deprecated__/main/utils/pure-logger"
import { IndexFactory } from "Core/index-storage/factories"
import {
  DataIndexInitializer,
  ControllerInitializer,
  InitializeInitializer,
  ObserverInitializer,
} from "Core/core/initializers"
import { Module } from "Core/core/types"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { IndexStorageModule } from "Core/index-storage/index-storage.module"
import { DataSyncModule } from "Core/data-sync/data-sync.module"
import { ContactModule } from "Core/contacts/contact.module"
import { MessageModule } from "Core/messages/message.module"
import { OutboxModule } from "Core/outbox/outbox.module"
import { AnalyticDataTrackerModule } from "Core/analytic-data-tracker/analytic-data-tracker.module"
import { SettingsModule } from "Core/settings/settings.module"
import { CrashDumpModule } from "Core/crash-dump/crash-dump.module"
import { TemplateModule } from "Core/templates/template.module"
import { FilesManagerModule } from "Core/files-manager/files-manager.module"
import { SearchModule } from "Core/search/search.module"
import { UpdateModule } from "Core/update/update.module"
import { BackupModule } from "Core/backup/backup.module"
import { DeviceInfoModule } from "Core/device-info/device-info.module"
import { DeviceFileSystemModule } from "Core/device-file-system/device-file-system.module"
import { DeviceLogModule } from "Core/device-log/device-log.module"
import { DeviceModule } from "Core/device/device.module"
import { DeviceManagerModule } from "Core/device-manager/device-manager.module"
import {
  DeviceManager,
  DeviceResolverService,
} from "Core/device-manager/services"
import { APIModule } from "device/feature"
import { FileSystemDialogModule } from "shared/app-state"

export class ApplicationModule {
  public modules: Module[] = [
    DeviceInfoModule,
    IndexStorageModule,
    OutboxModule,
    AnalyticDataTrackerModule,
    SettingsModule,
    ContactModule,
    MessageModule,
    FilesManagerModule,
    TemplateModule,
    SearchModule,
    UpdateModule,
    BackupModule,
    DeviceFileSystemModule,
    DeviceLogModule,
    DeviceModule,
  ]
  public lateModules: Module[] = [
    DeviceManagerModule,
    DataSyncModule,
    CrashDumpModule,
  ]

  private deviceLogger: DeviceLogger = LoggerFactory.getInstance()
  private index = new IndexFactory().create()
  private keyStorage = new MetadataStore()
  private logger = logger
  private eventEmitter = new EventEmitter()
  private fileSystem = new FileSystemService()

  private dataStorageInitializer: DataIndexInitializer
  private observerInitializer: ObserverInitializer
  private controllerInitializer: ControllerInitializer
  private initializeInitializer: InitializeInitializer

  private apiModule: APIModule

  private deviceManager = new DeviceManager(
    new DeviceResolverService(),
    this.eventEmitter
  )

  constructor(
    private ipc: MainProcessIpc,
    private mainApplicationWindow: BrowserWindow
  ) {
    const enabled = flags.get(Feature.LoggerEnabled)

    this.deviceLogger.registerLogger(new PureLogger())
    this.deviceLogger.toggleLogs(enabled)

    this.dataStorageInitializer = new DataIndexInitializer(this.index)
    this.observerInitializer = new ObserverInitializer()
    this.controllerInitializer = new ControllerInitializer()
    this.initializeInitializer = new InitializeInitializer()

    this.modules.forEach(this.initModule)
    this.apiModule = new APIModule(this.deviceManager)
    this.controllerInitializer.initialize(this.apiModule.getAPIServices())
    this.controllerInitializer.initialize(
      FileSystemDialogModule.getControllers()
    )
  }

  lateInitialization(): void {
    this.lateModules.forEach(this.initModule)
  }

  private initModule = (module: Module): void => {
    const instance = new module(
      this.index,
      this.deviceManager,
      this.keyStorage,
      this.logger,
      this.ipc,
      this.eventEmitter,
      this.fileSystem,
      this.mainApplicationWindow
    )

    this.dataStorageInitializer.initialize(instance.models)
    this.initializeInitializer.initialize(instance.initializers)
    this.observerInitializer.initialize(instance.observers)
    this.controllerInitializer.initialize(instance.controllers)
  }
}
