/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceManager } from "Core/device-manager/services"
import { APIConfigService } from "./api-config/api-config.service"
import { APIFeaturesService } from "./api-features/api-features.service"
import { APIBackupService } from "./backup"
import { APIMenuService } from "./menu"
import { APIOutboxService } from "./outbox/outbox.service"
import { ServerService } from "./server/server.service"
import { APIFileTransferService } from "./file-transfer"

export class APIModule {
  private apiConfigService: APIConfigService
  private apiFeaturesService: APIFeaturesService
  private apiOutboxService: APIOutboxService
  private apiMenuService: APIMenuService
  private serverService: ServerService
  private backupService: APIBackupService
  private fileTransferService: APIFileTransferService

  constructor(deviceManager: DeviceManager) {
    this.apiConfigService = new APIConfigService(deviceManager)
    this.apiFeaturesService = new APIFeaturesService(deviceManager)
    this.apiOutboxService = new APIOutboxService(deviceManager)
    this.apiMenuService = new APIMenuService(deviceManager)
    this.serverService = new ServerService()
    this.backupService = new APIBackupService(deviceManager)
    this.fileTransferService = new APIFileTransferService(deviceManager)
  }

  public getAPIServices() {
    return [
      this.apiConfigService,
      this.apiFeaturesService,
      this.apiOutboxService,
      this.apiMenuService,
      this.serverService,
      this.backupService,
      this.fileTransferService,
    ]
  }
}
