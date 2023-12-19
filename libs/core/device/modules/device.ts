/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject, Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import {
  RequestResponse,
  RequestResponseStatus,
} from "Core/core/types/request-response.interface"
import { DeviceType, DeviceCommunicationError } from "Core/device/constants"
import { RequestConfig } from "Core/device/types/mudita-os"
import { DeviceStrategy } from "Core/device/strategies/device-strategy.class"

export interface DeviceProperties {
  path: string
  serialNumber: string
  deviceType: DeviceType
}

export const getDevicePropertiesFromDevice = ({
  path,
  serialNumber,
  deviceType,
}: Device): DeviceProperties => {
  return {
    path,
    serialNumber,
    deviceType,
  }
}

export class Device implements DeviceProperties {
  constructor(
    public path: string,
    public serialNumber: string,
    public deviceType: DeviceType,
    private strategy: DeviceStrategy
  ) {}

  // TODO: to remove
  public toSerializableObject(): DeviceProperties {
    return {
      path: this.path,
      serialNumber: this.serialNumber,
      deviceType: this.deviceType,
    }
  }

  public connect(): Promise<ResultObject<undefined>> {
    return this.strategy.connect()
  }

  public async request<ResponseType = unknown>(
    config: RequestConfig<unknown>
  ): Promise<ResultObject<ResponseType, DeviceCommunicationError>> {
    const response = (await this.strategy.request(config)) as RequestResponse<
      ResponseType,
      unknown
    >
    if (response.status !== RequestResponseStatus.Ok) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.RequestFailed,
          `Request to device ${this.path} failed`,
          response
        )
      )
    } else {
      return Result.success(response.data as ResponseType)
    }
  }
}
