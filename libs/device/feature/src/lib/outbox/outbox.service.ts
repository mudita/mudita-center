/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError } from "Core/core/errors"
import { DeviceManager } from "Core/device-manager/services"
import { APIOutboxServiceEvents, Outbox } from "device/models"
import { GeneralError } from "../general-error"

export class APIOutboxService {
  constructor(private deviceManager: DeviceManager) {}

  @IpcEvent(APIOutboxServiceEvents.GetOutboxData)
  public async getOutboxData(): Promise<ResultObject<Outbox>> {
    const device = this.deviceManager.apiDevice
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "OUTBOX",
      method: "GET",
    })
    if (response.ok) {
      return Result.success(response.data.body as Outbox)
    }

    return Result.failed(response.error)
  }
}
