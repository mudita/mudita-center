/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { callRenderer } from "shared/utils"
import { DeviceCommunicationError } from "core-device/models"
import { RequestConfig } from "Core/device/types/mudita-os"
import {
  RequestResponse,
  RequestResponseStatus,
} from "Core/core/types/request-response.interface"
import { BaseAdapter } from "Core/device/modules/base.adapter"
import { DeviceStrategy } from "Core/device/strategies/device-strategy.class"
import { ResponsePresenter } from "Core/device/modules/mudita-os/presenters"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"

export enum PureStrategyMainEvent {
  ActiveDeviceLocked = "pure-device-active-device-locked",
}

export class PureStrategy implements DeviceStrategy {
  constructor(private adapter: BaseAdapter) {}

  public connect(): Promise<ResultObject<undefined>> {
    return this.adapter.connect()
  }

  public async request<ResponseType = unknown>(
    config: RequestConfig<unknown>
  ): Promise<ResultObject<ResponseType, DeviceCommunicationError>> {
    const response = await this.adapter.request(config)
    const serializedResponse = ResponsePresenter.toResponseObject(response)

    if (serializedResponse.status === RequestResponseStatus.PhoneLocked) {
      callRenderer(PureStrategyMainEvent.ActiveDeviceLocked, {
        path: this.adapter.path,
      })
    }

    return this.mapResponseObjectToResultObject<ResponseType>(
      serializedResponse
    )
  }

  private mapResponseObjectToResultObject<ResponseType>(
    response: RequestResponse
  ): ResultObject<ResponseType, DeviceCommunicationError> {
    if (response.status === RequestResponseStatus.PhoneLocked) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.DeviceLocked,
          `Device ${this.adapter.path} is locked`,
          response
        )
      )
    } else if (
      response.status === RequestResponseStatus.OnboardingNotFinished
    ) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.DeviceOnboardingNotFinished,
          `Device ${this.adapter.path} onboarding not finished`,
          response
        )
      )
    } else if (response.status === RequestResponseStatus.BatteryCriticalLevel) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.BatteryCriticalLevel,
          `Device ${this.adapter.path} has critical battery level`,
          response
        )
      )
    } else if (response.status !== RequestResponseStatus.Ok) {
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
  }
}
