/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocolService } from "device-protocol/feature"
import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import {
  ApiConfig,
  APIConfigServiceEvents,
  ApiConfigValidator,
  GeneralError,
} from "device/models"
import { DeviceId } from "Core/device/constants/device-id"
import { AppError } from "Core/core/errors"
import { APIConfigError } from "./api-config-error"

export class APIConfigService {
  constructor(private deviceManager: DeviceProtocolService) {}

  @IpcEvent(APIConfigServiceEvents.APIConfig)
  public async getAPIConfig(
    deviceId?: DeviceId
  ): Promise<ResultObject<ApiConfig>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "API_CONFIGURATION",
      method: "GET",
      body: {},
    })

    if (response.ok) {
      const apiConfig = ApiConfigValidator.safeParse(response.data.body)

      return apiConfig.success
        ? Result.success(apiConfig.data)
        : Result.failed(new AppError(APIConfigError.IncorrectResponse, ""))
    }

    return Result.failed(response.error)
  }

  //to remove
  @IpcEvent(APIConfigServiceEvents.APIAny)
  public async getAPIAny(payload: unknown): Promise<ResultObject<unknown>> {
    const device = this.deviceManager.apiDevice
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const pure = await device.requestAny(payload)
    return Result.success(pure)
  }
}
