/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import MuditaDeviceManager from "@mudita/pure"
import { DeviceService } from "App/backend/device-service"
// TODO change module name to `KeyStorage`
import { MetadataStore } from "App/metadata/services"
import logger from "App/main/utils/logger"
import { flags, Feature } from "App/feature-flags"
import PureLogger from "App/main/utils/pure-logger"
import { IndexStorageService } from "App/index-storage/services"
import {
  DataIndexInitializer,
  ControllerInitializer,
} from "App/core/initializers"
import { Module } from "App/core/types"

export class ApplicationModule {
  static modules: Module[] = []

  private ipc = ipcMain
  private index = new IndexStorageService()
  private deviceService = new DeviceService(MuditaDeviceManager, this.ipc)
  private keyStorage = new MetadataStore()
  private logger = logger

  constructor() {
    const loggerEnabled = flags.get(Feature.LoggerEnabled)

    MuditaDeviceManager.registerLogger(new PureLogger())
    MuditaDeviceManager.toggleLogs(loggerEnabled)

    const dataStorageInitializer = new DataIndexInitializer(this.index)
    const controllerInitializer = new ControllerInitializer()

    ApplicationModule.modules.forEach((module) => {
      const instance = new module(
        this.index.indexesMap,
        this.deviceService,
        this.keyStorage,
        this.logger,
        this.ipc
      )

      dataStorageInitializer.initialize(instance.models)
      controllerInitializer.initialize(instance.controllers)
    })
  }
}
