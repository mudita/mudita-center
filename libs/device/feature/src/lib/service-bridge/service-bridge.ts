/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SettingsService } from "Core/settings/services"
import { APIFileTransferService } from "../file-transfer"
import { SystemUtilsModule } from "system-utils/feature"
import { FileManager } from "../file-manager"
import { DeviceSystemActionsService } from "../device-system-actions/device-system-actions.service"

export class ServiceBridge {
  private _fileTransfer?: APIFileTransferService
  get fileTransfer(): APIFileTransferService {
    if (!this._fileTransfer) {
      throw new Error(
        "APIFileTransferService reference has not been set in ServiceBridge"
      )
    }
    return this._fileTransfer
  }
  set fileTransfer(value: APIFileTransferService) {
    this._fileTransfer = value
  }

  private _settingsService?: SettingsService
  get settingsService(): SettingsService {
    if (!this._settingsService) {
      throw new Error(
        "SettingsService reference has not been set in ServiceBridge"
      )
    }
    return this._settingsService
  }
  set settingsService(value: SettingsService) {
    this._settingsService = value
  }

  private _systemUtilsModule?: SystemUtilsModule
  get systemUtilsModule(): SystemUtilsModule {
    if (!this._systemUtilsModule) {
      throw new Error(
        "SystemUtilsService reference has not been set in ServiceBridge"
      )
    }
    return this._systemUtilsModule
  }
  set systemUtilsModule(value: SystemUtilsModule) {
    this._systemUtilsModule = value
  }

  private _fileManager?: FileManager
  get fileManager(): FileManager {
    if (!this._fileManager) {
      throw new Error(
        "FileManagerService reference has not been set in ServiceBridge"
      )
    }
    return this._fileManager
  }
  set fileManager(value: FileManager) {
    this._fileManager = value
  }

  private _deviceSystemActions?: DeviceSystemActionsService
  get deviceSystemActions(): DeviceSystemActionsService {
    if (!this._deviceSystemActions) {
      throw new Error(
        "SystemActionsService reference has not been set in ServiceBridge"
      )
    }
    return this._deviceSystemActions
  }
  set deviceSystemActions(value: DeviceSystemActionsService) {
    this._deviceSystemActions = value
  }

  constructor() {}
}
