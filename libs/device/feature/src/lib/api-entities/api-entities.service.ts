/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { Result, ResultObject } from "Core/core/builder"
import { AppError, AppErrorType } from "Core/core/errors"
import {
  entityConfigValidator,
  EntitiesError,
  EntityConfig,
  GeneralError,
  APIEntitiesServiceEvents,
} from "device/models"
import { SafeParseSuccess } from "zod"
import { IpcEvent } from "Core/core/decorators"

export class APIEntitiesService {
  constructor(private deviceProtocol: DeviceProtocol) {}

  private getDevice = (deviceId?: DeviceId) => {
    return deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice
  }

  private handleError(responseStatus: AppErrorType) {
    if (EntitiesError[responseStatus as EntitiesError]) {
      return Result.failed<unknown, AppErrorType>(
        new AppError(
          responseStatus,
          EntitiesError[responseStatus as EntitiesError]
        )
      )
    } else {
      return Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }
  }

  private handleSuccess<Data>(response: SafeParseSuccess<Data>) {
    return Result.success(response.data)
  }

  @IpcEvent(APIEntitiesServiceEvents.EntityConfig)
  public async getEntityConfiguration({
    entityType,
    deviceId,
  }: {
    entityType: string
    deviceId?: DeviceId
  }): Promise<ResultObject<EntityConfig>> {
    const device = this.getDevice(deviceId)
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "ENTITY_CONFIGURATION",
      method: "GET",
      body: {
        type: entityType,
      },
    })
    if (!response.ok) {
      return this.handleError(response.error.type)
    }

    const apiConfig = entityConfigValidator.safeParse(response.data.body)
    if (!apiConfig.success) {
      return this.handleError(response.data.status)
    }
    return this.handleSuccess(apiConfig)
  }
}
