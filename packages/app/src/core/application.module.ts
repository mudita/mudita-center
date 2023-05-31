/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
// TODO change module name to `KeyStorage`
import { MetadataStore } from "App/metadata/services"
import logger from "App/__deprecated__/main/utils/logger"
import { LoggerFactory } from "App/core/factories"
import { DeviceLogger } from "App/core/types"
import { flags, Feature } from "App/feature-flags"
import PureLogger from "App/__deprecated__/main/utils/pure-logger"
import { IndexFactory } from "App/index-storage/factories"
import {
  DataIndexInitializer,
  ControllerInitializer,
  InitializeInitializer,
  ObserverInitializer,
} from "App/core/initializers"
import { Module } from "App/core/types"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { FileSystemModule } from "App/file-system/file-system.module"
import { IndexStorageModule } from "App/index-storage/index-storage.module"
import { DataSyncModule } from "App/data-sync/data-sync.module"
import { ContactModule } from "App/contacts/contact.module"
import { MessageModule } from "App/messages/message.module"
import { OutboxModule } from "App/outbox/outbox.module"
import { AnalyticDataTrackerModule } from "App/analytic-data-tracker/analytic-data-tracker.module"
import { SettingsModule } from "App/settings/settings.module"
import { CrashDumpModule } from "App/crash-dump/crash-dump.module"
import { TemplateModule } from "App/templates/template.module"
import { FilesManagerModule } from "App/files-manager/files-manager.module"
import { SearchModule } from "App/search/search.module"
import { UpdateModule } from "App/update/update.module"
import { BackupModule } from "App/backup/backup.module"
import { DeviceInfoModule } from "App/device-info/device-info.module"
import { DeviceFileSystemModule } from "App/device-file-system/device-file-system.module"
import { DeviceLogModule } from "App/device-log/device-log.module"
import { DeviceModule } from "App/device/device.module"
import { DeviceManagerModule } from "App/device-manager/device-manager.module"
import {
  DeviceManager,
  DeviceResolverService,
} from "App/device-manager/services"
import { PhoneNumbersModule } from "App/phone-numbers/phone-numbers.module"

export class ApplicationModule {
  public modules: Module[] = [
    DeviceInfoModule,
    FileSystemModule,
    IndexStorageModule,
    OutboxModule,
    PhoneNumbersModule,
    AnalyticDataTrackerModule,
    SettingsModule,
    ContactModule,
    MessageModule,
    FilesManagerModule,
    CrashDumpModule,
    TemplateModule,
    SearchModule,
    UpdateModule,
    BackupModule,
    DeviceFileSystemModule,
    DeviceLogModule,
    DeviceModule,
    DeviceManagerModule,
  ]
  public lateModules: Module[] = [DataSyncModule]

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

  private deviceManager = new DeviceManager(
    new DeviceResolverService(this.ipc, this.eventEmitter),
    this.ipc,
    this.eventEmitter
  )

  constructor(private ipc: MainProcessIpc) {
    const enabled = flags.get(Feature.LoggerEnabled)

    this.deviceLogger.registerLogger(new PureLogger())
    this.deviceLogger.toggleLogs(enabled)

    this.dataStorageInitializer = new DataIndexInitializer(this.index)
    this.observerInitializer = new ObserverInitializer()
    this.controllerInitializer = new ControllerInitializer()
    this.initializeInitializer = new InitializeInitializer()

    this.modules.forEach(this.initModule)
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
      this.fileSystem
    )

    this.dataStorageInitializer.initialize(instance.models)
    this.initializeInitializer.initialize(instance.initializers)
    this.observerInitializer.initialize(instance.observers)
    this.controllerInitializer.initialize(instance.controllers)
  }
}
