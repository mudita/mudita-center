/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SettingsService } from "Core/settings/services"
import { APIFileTransferService } from "../file-transfer"

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

  constructor() {}
}
