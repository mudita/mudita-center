/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceManager } from "Core/device-manager/services"
import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"

export interface APIConfigResponse {
  apiVersion: string
  pure: unknown
}

export enum APIServiceEvents {
  APIConfig = "apiservice_api-config",
  APIAny = "apiservice_api-ani-any",
}

export class APIConfigService {
  constructor(private deviceManager: DeviceManager) {}

  @IpcEvent(APIServiceEvents.APIConfig)
  public async getAPIConfig(): Promise<ResultObject<APIConfigResponse>> {
    const response = await this.deviceManager.apiDevice.request({
      endpoint: "API_CONFIGURATION",
      method: "GET",
      body: {},
    })

    return Result.success({ apiVersion: "0.1.0", pure: response })
  }

  //to remove
  @IpcEvent(APIServiceEvents.APIAny)
  public async getAPIAny(payload: unknown): Promise<ResultObject<unknown>> {
    const pure = await this.deviceManager.apiDevice.requestAny(payload)
    return Result.success(pure)
  }
}
