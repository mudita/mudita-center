/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "App/metadata/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import {
  SettingsController,
  ConfigurationController,
} from "App/settings/controllers"
import { ConfigurationService } from "App/settings/services"
import { getSettingsService } from "App/settings/containers/settings.container"
import { DeviceManager } from "App/device-manager/services"

export class SettingsModule extends BaseModule {
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

    const configurationService = new ConfigurationService()
    const settingsController = new SettingsController(settingsService)
    const configurationController = new ConfigurationController(
      configurationService
    )

    this.controllers = [settingsController, configurationController]
  }
}
