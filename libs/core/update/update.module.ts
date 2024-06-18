/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { getSettingsService } from "Core/settings/containers/settings.container"
import { createClient } from "Core/__deprecated__/api/mudita-center-server"
import { MetadataStore } from "Core/metadata/services"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { DeviceFileSystemService } from "Core/device-file-system/services"
import { AppLogger } from "Core/__deprecated__/main/utils/logger"
import { IndexStorage } from "Core/index-storage/types"
import { BaseModule } from "Core/core/module"
import {
  ReleaseService,
  DeviceUpdateService,
  DeviceUpdateFilesService,
} from "Core/update/services"
import {
  ReleasesController,
  DeviceUpdateController,
} from "Core/update/controllers"
import { DeviceProtocolService } from "device-protocol/feature"
import { DeviceInfoService } from "Core/device-info/services"
import { RELEASE_TIMEOUT } from "Core/update/constants/get-release-timeout.constant"

export class UpdateModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceProtocolService: DeviceProtocolService,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      deviceProtocolService,
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
      this.deviceProtocolService,
      new DeviceFileSystemService(this.deviceProtocolService),
      new DeviceInfoService(this.deviceProtocolService)
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
