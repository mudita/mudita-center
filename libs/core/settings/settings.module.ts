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
import {
  SettingsController,
  ConfigurationController,
} from "Core/settings/controllers"
import { ConfigurationService } from "Core/settings/services"
import { getSettingsService } from "Core/settings/containers/settings.container"
import { DeviceProtocolService } from "device-protocol/feature"

export class SettingsModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceManager: DeviceProtocolService,
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
