/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject, FailedResult } from "App/core/builder"
import { AppError } from "App/core/errors"
import { Endpoint, Method } from "App/device/constants"
import { DeviceInfo } from "App/device-info/dto"
import { DeviceInfoPresenter } from "App/device-info/presenters"
import { DeviceManager } from "App/device-manager/services"
import { DeviceInfo as DeviceInfoRaw } from "App/device/types/mudita-os"

export class DeviceInfoService {
  constructor(private deviceManager: DeviceManager) {}

  public async getDeviceInfo(): Promise<ResultObject<DeviceInfo>> {
    try {
      const response = await this.deviceManager.device.request<DeviceInfoRaw>({
        endpoint: Endpoint.DeviceInfo,
        method: Method.Get,
      })

      if (!response.data) {
        return response as FailedResult
      }

      return Result.success(DeviceInfoPresenter.toDto(response.data))
    } catch (error) {
      return Result.failed(new AppError("", ""))
    }
  }
}
