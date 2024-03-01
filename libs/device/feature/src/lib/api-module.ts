/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceManager } from "Core/device-manager/services"
import { APIConfigService } from "./api-config/api-config.service"
import { APIFeaturesService } from "./api-features/api-features.service"
import { APIBackupService } from "./backup"
import { FileManager } from "./file-manager"
import { APIMenuService } from "./menu"
import { APIOutboxService } from "./outbox/outbox.service"
import { ServerService } from "./server/server.service"
import { APIFileTransferService } from "./file-transfer"
import { ServiceBridge } from "./service-bridge"
import { SystemUtilsModule } from "system-utils/feature"
import { createSettingsService } from "Core/settings/containers/settings.container"

export class APIModule {
  private apiConfigService: APIConfigService
  private apiFeaturesService: APIFeaturesService
  private apiOutboxService: APIOutboxService
  private apiMenuService: APIMenuService
  private serverService: ServerService
  private backupService: APIBackupService
  private fileTransferService: APIFileTransferService
  private fileManager: FileManager
  private serviceBridge: ServiceBridge

  constructor(
    deviceManager: DeviceManager,
    systemUtilsModule: SystemUtilsModule
  ) {
    this.serviceBridge = new ServiceBridge()
    this.apiConfigService = new APIConfigService(deviceManager)
    this.apiFeaturesService = new APIFeaturesService(deviceManager)
    this.apiOutboxService = new APIOutboxService(deviceManager)
    this.apiMenuService = new APIMenuService(deviceManager)
    this.serverService = new ServerService()
    this.backupService = new APIBackupService(deviceManager)
    this.fileTransferService = new APIFileTransferService(deviceManager)
    this.fileManager = new FileManager(deviceManager, this.serviceBridge)
    this.serviceBridge.systemUtilsModule = systemUtilsModule
    this.serviceBridge.fileTransfer = this.fileTransferService
    this.serviceBridge.settingsService = createSettingsService()
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
      this.fileManager,
    ]
  }
}
