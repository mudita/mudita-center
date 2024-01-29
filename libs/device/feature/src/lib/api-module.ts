/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceManager } from "Core/device-manager/services"
import { APIConfigService } from "./api-config/api-config.service"
import { APIFeaturesService } from "./api-features/api-features.service"
import { APIMenuService } from "./menu"
import { APIOutboxService } from "./outbox/outbox.service"

export class APIModule {
  private apiConfigService: APIConfigService
  private apiFeaturesService: APIFeaturesService
  private apiOutboxService: APIOutboxService
  private apiMenuService: APIMenuService

  constructor(deviceManager: DeviceManager) {
    this.apiConfigService = new APIConfigService(deviceManager)
    this.apiFeaturesService = new APIFeaturesService(deviceManager)
    this.apiOutboxService = new APIOutboxService(deviceManager)
    this.apiMenuService = new APIMenuService(deviceManager)
  }

  public getAPIServices() {
    return [
      this.apiConfigService,
      this.apiFeaturesService,
      this.apiOutboxService,
      this.apiMenuService,
    ]
  }
}
