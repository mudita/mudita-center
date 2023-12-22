/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RequestResponseStatus } from "Core/core/types"
import { DeviceStrategy } from "Core/device/strategies/device-strategy.class"
import { BaseAdapter } from "Core/device/modules/base.adapter"
import { RequestConfig } from "Core/device/types/mudita-os"
import { DeviceCommunicationError, Endpoint } from "Core/device/constants"
import { ResponseKompaktPresenter } from "Core/device/modules/mudita-os/presenters"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"

export class KompaktStrategy implements DeviceStrategy {
  constructor(private adapter: BaseAdapter) {}

  public connect(): Promise<ResultObject<undefined>> {
    return this.adapter.connect()
  }

  public async request<ResponseType = unknown>(
    config: RequestConfig<unknown>
  ): Promise<ResultObject<ResponseType, DeviceCommunicationError>> {
    //CP-1668 - this condition until Kompakt has limited endpoint support, currently only device info endpoint (10.08.2023)
    if ([Endpoint.DeviceInfo].includes(config.endpoint)) {
      const response = await this.adapter.request(config)
      const mappedResponse = ResponseKompaktPresenter.toResponseObject(response)
      if (mappedResponse.status !== RequestResponseStatus.Ok) {
        return Result.failed(
          new AppError(
            DeviceCommunicationError.RequestFailed,
            `Request to device ${this.adapter.path} failed`,
            response
          )
        )
      } else {
        return Result.success(response.data as ResponseType)
      }
    } else {
      return Result.success(undefined as ResponseType)
    }
  }
}
