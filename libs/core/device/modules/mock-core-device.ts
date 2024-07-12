/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { Result, ResultObject } from "Core/core/builder"
import { DeviceCommunicationError } from "core-device/models"
import { DeviceType } from "device-protocol/models"
import { RequestConfig } from "Core/device/types/mudita-os"
import { BaseDevice } from "Core/device/modules/base-device"
import { AppError } from "Core/core/errors"
import { DeviceError } from "Core/device/modules/mudita-os/constants"
import logger from "Core/__deprecated__/main/utils/logger"

export class MockCoreDevice extends BaseDevice {
  constructor(portInfo: PortInfo, deviceType: DeviceType) {
    super(portInfo, deviceType)
  }

  public connect(): Promise<ResultObject<undefined>> {
    logger.info(`API_CORE_DEVICE adapter - connect: ${this.portInfo.path}`)
    return Promise.resolve(
      Result.failed(new AppError(DeviceError.Initialization, ""))
    )
  }

  public request<ResponseType = unknown>(
    config: RequestConfig<unknown>
  ): Promise<ResultObject<ResponseType, DeviceCommunicationError>> {
    return Promise.resolve(
      Result.failed(
        new AppError(DeviceCommunicationError.DeviceInitializationFailed, "")
      )
    )
  }
}
