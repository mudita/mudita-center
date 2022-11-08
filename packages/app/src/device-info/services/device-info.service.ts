/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { Endpoint, Method } from "App/device/constants"
import { DeviceInfo } from "App/device-info/dto"
import { DeviceInfoPresenter } from "App/device-info/presenters"

// DEPRECATED
import DeviceService from "App/__deprecated__/backend/device-service"

export class DeviceInfoService {
  constructor(private deviceService: DeviceService) {}

  public async getDeviceInfo(): Promise<ResultObject<DeviceInfo>> {
    try {
      const response = await this.deviceService.request({
        endpoint: Endpoint.DeviceInfo,
        method: Method.Get,
      })

      if (!response.data) {
        return Result.failed(new AppError("", ""))
      }

      return Result.success(DeviceInfoPresenter.toDto(response.data))
    } catch (error) {
      return Result.failed(new AppError("", ""))
    }
  }
}
