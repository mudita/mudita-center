/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject, Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { Endpoint, Method, PhoneLockCategory } from "App/device/constants"
import { PhoneLockTime } from "App/device/dto"
import { Device } from "App/device/modules/device"

// DEPRECATED
import { DeviceService as LegacyDeviceService } from "App/__deprecated__/backend/device-service"

export class DeviceService {
  constructor(private deviceService: LegacyDeviceService) {}

  public async connect(): Promise<ResultObject<Device>> {
    const response = await this.deviceService.connect()

    if (response.status !== RequestResponseStatus.Ok || !response.data) {
      return Result.failed(new AppError("", ""))
    }

    return Result.success(response.data)
  }

  public async disconnect(): Promise<ResultObject<boolean>> {
    const response = await this.deviceService.disconnect()

    return Result.success(response.status === RequestResponseStatus.Ok)
  }

  public async unlock(code: string): Promise<ResultObject<boolean>> {
    const response = await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Put,
      body: {
        phoneLockCode: code,
      },
    })

    return Result.success(response.status === RequestResponseStatus.Ok)
  }

  public async unlockStatus(): Promise<ResultObject<RequestResponseStatus>> {
    const response = await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })

    return Result.success(response.status)
  }

  public async unlockTime(): Promise<ResultObject<PhoneLockTime>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Time },
    })

    if (status === RequestResponseStatus.UnprocessableEntity) {
      return Result.failed(new AppError("", ""))
    } else if (status !== RequestResponseStatus.Ok || !data) {
      return Result.failed(new AppError("", ""))
    }

    return Result.success(data)
  }
}
