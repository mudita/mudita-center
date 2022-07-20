/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import { MainProcessIpc } from "electron-better-ipc"
import { BaseModule } from "App/core/module"
import { IndexStorage } from "App/index-storage/types"
import { DeviceService } from "App/__deprecated__/backend/device-service"
import { MetadataStore } from "App/metadata"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AnalyticDataTrackerController } from "App/analytic-data-tracker/controllers"
import { AnalyticDataTrackerFactory } from "App/analytic-data-tracker/services"

const apiUrl = String(process.env.ANALYTICS_API_URL)
const siteId = Number(process.env.ANALYTICS_API_SITE_ID)

export class AnalyticDataTrackerModule extends BaseModule {
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
    const tracker = AnalyticDataTrackerFactory.create(this.fileSystem, {
      apiUrl,
      siteId,
    })

    if (tracker === undefined) {
      throw new Error("Initialize `AnalyticDataTracker` before get it")
    }

    const analyticDataTrackerController = new AnalyticDataTrackerController(
      tracker
    )

    this.controllers = [analyticDataTrackerController]
  }
}
