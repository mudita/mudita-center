/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { EventEmitter } from "events"
import { DeviceService } from "App/__deprecated__/backend/device-service"
// TODO change module name to `KeyStorage`
import { MetadataStore } from "App/metadata/services"
import logger from "App/__deprecated__/main/utils/logger"
import { IndexFactory } from "App/index-storage/factories"
import {
  DataIndexInitializer,
  ControllerInitializer,
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

export class ApplicationModule {
  public modules: Module[] = [
    FileSystemModule,
    IndexStorageModule,
    DataSyncModule,
    OutboxModule,
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
  ]

  private ipc = ipcMain
  private index = new IndexFactory().create()
  private keyStorage = new MetadataStore()
  private logger = logger
  private eventEmitter = new EventEmitter()
  private fileSystem = new FileSystemService()

  constructor(
    // TODO move to private instance method after all modules will be implemented
    private deviceService: DeviceService
  ) {
    const dataStorageInitializer = new DataIndexInitializer(this.index)
    const observerInitializer = new ObserverInitializer()
    const controllerInitializer = new ControllerInitializer()

    this.modules.forEach((module) => {
      const instance = new module(
        this.index,
        this.deviceService,
        this.keyStorage,
        this.logger,
        this.ipc,
        this.eventEmitter,
        this.fileSystem
      )

      dataStorageInitializer.initialize(instance.models)
      observerInitializer.initialize(instance.observers)
      controllerInitializer.initialize(instance.controllers)
    })
  }
}
