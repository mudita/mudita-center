/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceManager } from "App/device-manager/services/device-manager.service"
import { IpcEvent } from "App/core/decorators"
import { Result, ResultObject } from "App/core/builder"

export interface APIConfigResponse {
  apiVersion: string
}

export enum APIServiceEvents {
  APIConfig = "apiservice_api-config",
}

export class APIConfigService {
  constructor(private deviceManager: DeviceManager) {}

  @IpcEvent(APIServiceEvents.APIConfig)
  public async getAPIConfig(): Promise<ResultObject<APIConfigResponse>> {
    return Promise.resolve(Result.success({ apiVersion: "0.1.0" }))
  }
}
