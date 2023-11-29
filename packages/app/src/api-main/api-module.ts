/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceManager } from "App/device-manager/services/device-manager.service"
import { IpcEvent } from "App/core/decorators"
import { Result, ResultObject } from "App/core/builder"
import { APIConfigService } from "./api-config.service"

export interface APIConfigResponse {
  apiVersion: string
}
export class APIModule {
  private apiConfigService: APIConfigService

  constructor(deviceManager: DeviceManager) {
    this.apiConfigService = new APIConfigService(deviceManager)
  }

  public getAPIServices() {
    return [this.apiConfigService]
  }
}
