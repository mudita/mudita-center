/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { Endpoint, Method } from "core-device/models"
import { Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { TimeSynchronizationError } from "Core/time-synchronization/constants/error.constant"
import logger from "Core/__deprecated__/main/utils/logger"

export class TimeSynchronizationService {
  private counter = 0
  constructor(private deviceProtocol: DeviceProtocol) {}

  public async synchronizeTime() {
    const currentTime = Math.round(new Date().getTime() / 1000)
    const timezoneOffset = new Date().getTimezoneOffset() * 60
    const timestamp = currentTime - timezoneOffset
    logger.info("Synchronizing time", { counter: this.counter, timestamp })
    this.counter++

    const response = await this.deviceProtocol.device.request({
      endpoint: Endpoint.TimeSynchronization,
      method: Method.Post,
      body: {
        timestamp,
      },
      options: {
        connectionTimeOut: 5000,
      },
    })

    if (!response.ok) {
      return Result.failed(
        new AppError(
          TimeSynchronizationError.SynchronizationFailed,
          "Time synchronization failed"
        )
      )
    }

    return Result.success(true)
  }

  public async getTime() {
    const response = await this.deviceProtocol.device.request<{
      timestamp: number
    }>({
      endpoint: Endpoint.TimeSynchronization,
      method: Method.Get,
      body: {
        value: "timestamp",
      },
      options: {
        connectionTimeOut: 5000,
      },
    })

    if (!response.ok || !response.data?.timestamp) {
      return Result.failed(
        new AppError(
          TimeSynchronizationError.SynchronizationFailed,
          "Getting time failed"
        )
      )
    }
    return Result.success(response.data.timestamp * 1000)
  }
}
