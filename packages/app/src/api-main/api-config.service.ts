/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceManager } from "App/device-manager/services/device-manager.service"
import { IpcEvent } from "App/core/decorators"
import { Result, ResultObject } from "App/core/builder"

export interface APIConfigResponse {
  apiVersion: string
  pure: any
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
  public async getAPIAny(payload: any): Promise<ResultObject<any>> {
    const pure = await this.deviceManager.apiDevice.requestAny(payload)
    return Result.success(pure)
  }
}
