/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError } from "Core/core/errors"
import { DeviceProtocol } from "device-protocol/feature"
import { DeviceId } from "Core/device/constants/device-id"
import {
  APIOutboxServiceEvents,
  GeneralError,
  Outbox,
  OutboxValidator,
} from "device/models"

export class APIOutboxService {
  constructor(private deviceProtocol: DeviceProtocol) {}

  @IpcEvent(APIOutboxServiceEvents.GetOutboxData)
  public async getOutboxData(
    deviceId: DeviceId
  ): Promise<ResultObject<Outbox>> {
    const device = this.deviceProtocol.getAPIDeviceById(deviceId)
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "OUTBOX",
      method: "GET",
      options: {
        connectionTimeOut: 10_000,
      },
    })
    if (response.ok) {
      const outbox = OutboxValidator.safeParse(response.data.body)
      return outbox.success
        ? Result.success(outbox.data)
        : Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }

    return Result.failed(response.error)
  }
}
