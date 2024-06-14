/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError } from "Core/core/errors"
import { DeviceProtocolService } from "device-protocol/feature"
import { DeviceId } from "Core/device/constants/device-id"
import {
  APIOutboxServiceEvents,
  GeneralError,
  Outbox,
  OutboxValidator,
} from "device/models"

export class APIOutboxService {
  constructor(private deviceProtocolService: DeviceProtocolService) {}

  @IpcEvent(APIOutboxServiceEvents.GetOutboxData)
  public async getOutboxData(
    deviceId: DeviceId
  ): Promise<ResultObject<Outbox>> {
    const device = this.deviceProtocolService.getAPIDeviceById(deviceId)
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "OUTBOX",
      method: "GET",
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
