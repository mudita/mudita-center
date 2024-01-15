/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceManager } from "Core/device-manager/services"
import { APIConfigService } from "./api-config.service"
import { APIFeaturesService } from "./api-features/api-features.service"

export class APIModule {
  private apiConfigService: APIConfigService
  private apiFeaturesService: APIFeaturesService

  constructor(deviceManager: DeviceManager) {
    this.apiConfigService = new APIConfigService(deviceManager)
    this.apiFeaturesService = new APIFeaturesService(deviceManager)
  }

  public getAPIServices() {
    return [this.apiConfigService, this.apiFeaturesService]
  }
}
