/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { ResponseStatus } from "Core/device"
import { DeviceType } from "device-protocol/models"
import { DeviceError } from "Core/device/modules/mudita-os/constants"
import { BaseDevice } from "Core/device/modules/base-device"
import { ApiResponse } from "Core/device/types/mudita-os"
import {
  APIEndpointType,
  APIMethodsType,
  APIRequestWithPayload,
  ApiError,
} from "device/models"
import { PortInfo } from "serialport"
import { mockDescriptor } from "../mock-descriptor/mock-descriptor"
import { AppError } from "Core/core/errors"
import logger from "Core/__deprecated__/main/utils/logger"

export class MockDevice extends BaseDevice {
  public connect(): Promise<ResultObject<undefined>> {
    logger.info(`API_MOCK_DEVICE adapter - connect: ${this.portInfo.path}`)
    return new Promise((resolve) => {
      resolve(Result.success(undefined))
    })
  }

  public request<R, T extends APIEndpointType>(
    config: APIRequestWithPayload<T>
  ): Promise<unknown> {
    const response = mockDescriptor.getResponse(
      this.portInfo.path,
      config.endpoint,
      config.method as APIMethodsType,
      config.body
    )
    let result: ResultObject<ApiResponse<unknown>> | undefined = undefined

    const status = Number.parseInt(`${response?.status ?? 500}`)

    if (response && status > 199 && status < 300) {
      result = Result.success({
        ...response,
        endpoint: config.endpoint,
      } as unknown as ApiResponse<unknown>)
    } else if (response) {
      result = Result.failed(
        new AppError(response.status, ApiError[response.status])
      )
    } else {
      result = Result.failed(
        new AppError(
          DeviceError.TimeOut,
          `Cannot receive response from ${this.portInfo.path}`
        ),
        {
          status: ResponseStatus.Timeout,
          ...config,
        }
      )
    }

    return new Promise<ResultObject<ApiResponse<unknown>>>((resolve) => {
      resolve(result!)
    })
  }

  constructor(public portInfo: PortInfo, public deviceType: DeviceType) {
    super(portInfo, deviceType)
  }
}
