/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError } from "Core/core/errors"
import { DeviceManager } from "Core/device-manager/services"
import { DeviceId } from "Core/device/constants/device-id"
import { ApiContactsServiceEvents, GeneralError } from "device/models"

export class APIContactsService {
  constructor(private deviceManager: DeviceManager) {}

  @IpcEvent(ApiContactsServiceEvents.DeleteAllContacts)
  public async deleteAllContacts({
    deviceId,
  }: {
    deviceId?: DeviceId
  }): Promise<ResultObject<undefined>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "CONTACTS",
      method: "DELETE",
      body: {},
    })
    return response.ok
      ? Result.success(undefined)
      : Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
  }
}
