/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppMtp } from "app-mtp"
import { DeviceProtocol } from "device-protocol/feature"
import { APIConfigService } from "./api-config/api-config.service"
import { APIFeaturesService } from "./api-features/api-features.service"
import { APIBackupService } from "./backup"
import { FileManager } from "./file-manager"
import { APIMenuService } from "./menu"
import { APIOutboxService } from "./outbox/outbox.service"
import { APIFileTransferService } from "./file-transfer"
import { ServiceBridge } from "./service-bridge"
import { SystemUtilsModule } from "system-utils/feature"
import { APIRestoreService } from "./restore"
import { DeviceSystemActionsService } from "./device-system-actions/device-system-actions.service"
import { APIDataTransferService } from "./data-transfer"
import { APIEntitiesService } from "./api-entities"
import { ISettingsService } from "shared/utils"
import { AppInstallationService } from "./file-manager/app-installation.service"
import { MtpFileTransferService } from "./file-transfer/mtp-file-transfer.service"

export class APIModule {
  private apiConfigService: APIConfigService
  private apiFeaturesService: APIFeaturesService
  private apiOutboxService: APIOutboxService
  private apiMenuService: APIMenuService
  private apiEntitiesService: APIEntitiesService
  private backupService: APIBackupService
  private restoreService: APIRestoreService
  private fileTransferService: APIFileTransferService
  private fileManager: FileManager
  private deviceSystemActionsService: DeviceSystemActionsService
  private serviceBridge: ServiceBridge
  private apiDataTransferService: APIDataTransferService
  private appInstallationService: AppInstallationService
  private mtpFileTransferService: MtpFileTransferService

  constructor(
    deviceProtocol: DeviceProtocol,
    systemUtilsModule: SystemUtilsModule,
    settingsService: ISettingsService
  ) {
    this.serviceBridge = new ServiceBridge()
    this.apiConfigService = new APIConfigService(deviceProtocol)
    this.apiFeaturesService = new APIFeaturesService(deviceProtocol)
    this.apiOutboxService = new APIOutboxService(deviceProtocol)
    this.apiMenuService = new APIMenuService(deviceProtocol)
    this.apiEntitiesService = new APIEntitiesService(
      deviceProtocol,
      this.serviceBridge
    )
    this.backupService = new APIBackupService(deviceProtocol)
    this.apiDataTransferService = new APIDataTransferService(deviceProtocol)
    this.restoreService = new APIRestoreService(
      deviceProtocol,
      this.serviceBridge
    )
    this.fileTransferService = new APIFileTransferService(
      deviceProtocol,
      this.serviceBridge
    )
    this.fileManager = new FileManager(deviceProtocol, this.serviceBridge)
    this.appInstallationService = new AppInstallationService(deviceProtocol)
    this.deviceSystemActionsService = new DeviceSystemActionsService(
      deviceProtocol
    )
    this.serviceBridge.systemUtilsModule = systemUtilsModule
    this.serviceBridge.fileTransfer = this.fileTransferService
    // @ts-ignore
    this.serviceBridge.settingsService = settingsService
    this.serviceBridge.fileManager = this.fileManager
    this.serviceBridge.deviceSystemActions = this.deviceSystemActionsService

    this.mtpFileTransferService = new MtpFileTransferService(new AppMtp())
  }

  public getAPIServices() {
    return [
      this.apiConfigService,
      this.apiFeaturesService,
      this.apiOutboxService,
      this.apiMenuService,
      this.apiEntitiesService,
      this.backupService,
      this.restoreService,
      this.fileTransferService,
      this.fileManager,
      this.deviceSystemActionsService,
      this.apiDataTransferService,
      this.appInstallationService,
      this.mtpFileTransferService,
    ]
  }
}
