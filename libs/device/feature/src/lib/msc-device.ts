/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { APIEndpointType, APIRequestWithPayload } from "device/models"
import { BaseDevice } from "Core/device/modules/base-device"
import { DeviceType } from "device-protocol/models"
import { Result, ResultObject } from "Core/core/builder"
import logger from "Core/__deprecated__/main/utils/logger"
import { AppError } from "Core/core/errors"

export class MSCDevice extends BaseDevice {
  constructor(portInfo: PortInfo, deviceType: DeviceType) {
    super(portInfo, deviceType)
  }
  connect(): Promise<ResultObject<undefined>> {
    logger.info(`MSC_DEVICE adapter - connect: ${this.portInfo.path}`)
    return Promise.resolve(Result.success(undefined))
  }

  public request<R, T extends APIEndpointType>(
    config: APIRequestWithPayload<T>
  ) {
    return Promise.resolve(
      Result.failed(
        new AppError("request method is not required for msc devices")
      )
    )
  }
}
