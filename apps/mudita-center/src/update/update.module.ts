/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { getSettingsService } from "App/settings/containers/settings.container"
import { createClient } from "App/__deprecated__/api/mudita-center-server"
import { MetadataStore } from "App/metadata/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { DeviceFileSystemService } from "App/device-file-system/services"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import {
  ReleaseService,
  DeviceUpdateService,
  DeviceUpdateFilesService,
} from "App/update/services"
import {
  ReleasesController,
  DeviceUpdateController,
} from "App/update/controllers"
import { DeviceManager } from "App/device-manager/services"
import { DeviceInfoService } from "App/device-info/services"
import { RELEASE_TIMEOUT } from "App/update/constants/get-release-timeout.constant"

export class UpdateModule extends BaseModule {
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

    const deviceUpdateService = new DeviceUpdateService(
      settingsService,
      this.deviceManager,
      new DeviceFileSystemService(this.deviceManager),
      new DeviceInfoService(this.deviceManager)
    )
    const deviceUpdateFilesService = new DeviceUpdateFilesService()
    const releaseService = new ReleaseService(createClient(RELEASE_TIMEOUT))
    const releasesController = new ReleasesController(releaseService)
    const deviceUpdateController = new DeviceUpdateController(
      deviceUpdateService,
      deviceUpdateFilesService
    )

    this.controllers = [releasesController, deviceUpdateController]
  }
}
