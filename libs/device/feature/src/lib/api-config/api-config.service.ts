/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceManager } from "Core/device-manager/services"
import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { ApiConfig, APIConfigServiceEvents } from "device/models"

export class APIConfigService {
  constructor(private deviceManager: DeviceManager) {}

  @IpcEvent(APIConfigServiceEvents.APIConfig)
  public async getAPIConfig(): Promise<ResultObject<ApiConfig>> {
    const response = await this.deviceManager.apiDevice.request({
      endpoint: "API_CONFIGURATION",
      method: "GET",
      body: {},
    })

    if (response.ok) {
      return Result.success(response.data.body as ApiConfig)
    }

    return Result.failed(response.error)
  }

  //to remove
  @IpcEvent(APIConfigServiceEvents.APIAny)
  public async getAPIAny(payload: unknown): Promise<ResultObject<unknown>> {
    const pure = await this.deviceManager.apiDevice.requestAny(payload)
    return Result.success(pure)
  }
}
