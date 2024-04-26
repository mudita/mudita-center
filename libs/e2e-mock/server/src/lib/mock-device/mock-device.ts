/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { DeviceType } from "Core/device"
import { BaseDevice } from "Core/device/modules/base-device"
import { ApiResponse } from "Core/device/types/mudita-os"
import {
  APIEndpointType,
  APIMethodsType,
  APIRequestWithPayload,
} from "device/models"
import { PortInfo } from "serialport"
import DEFAULT_RESPONSES from "./default-responses"

export class MockDevice extends BaseDevice {
  public connect(): Promise<ResultObject<undefined>> {
    return new Promise((resolve) => {
      resolve(Result.success(undefined))
    })
  }

  public request<R, T extends APIEndpointType>(
    config: APIRequestWithPayload<T>
  ): Promise<unknown> {
    const responses =
      DEFAULT_RESPONSES[config.endpoint]?.[config.method as APIMethodsType]

    if (responses) {
      return new Promise<ResultObject<ApiResponse<unknown>>>((resolve) => {
        resolve(
          Result.success({
            ...responses,
            endpoint: config.endpoint,
          } as unknown as ApiResponse<unknown>)
        )
      })
    }

    throw new Error("Method not implemented.")
  }

  constructor(public portInfo: PortInfo, public deviceType: DeviceType) {
    super(portInfo, deviceType)
  }
}
