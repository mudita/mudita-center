/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError } from "Core/core/errors"
import { DeviceProtocol } from "device-protocol/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ApiResponse } from "Core/device/types/mudita-os"
import {
  APIBackupServiceEvents,
  APIRequestWithPayload,
  GeneralError,
  PreBackup,
  PreBackupValidator200,
  PreBackupValidator202,
} from "device/models"
import random from "lodash/random"

export class APIBackupService {
  constructor(private deviceProtocol: DeviceProtocol) {}

  @IpcEvent(APIBackupServiceEvents.StartPreBackup)
  public async startPreBackup({
    features,
    deviceId,
  }: {
    features: string[]
    deviceId?: DeviceId
  }): Promise<ResultObject<PreBackup>> {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    console.log("startPreBackup", features, deviceId)

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const backupId = random(1, 100000)
    const requestConfig: APIRequestWithPayload<"PRE_BACKUP"> = {
      endpoint: "PRE_BACKUP",
      method: "POST",
      body: {
        backupId,
        features,
      },
    }
    console.log(
      "startPreBackup requestConfig",
      JSON.stringify(requestConfig, null, 2)
    )

    const response = await device.request(requestConfig)

    console.log("startPreBackup response", JSON.stringify(response, null, 2))

    return this.parsePreBackupResponse(response, features)
  }

  @IpcEvent(APIBackupServiceEvents.CheckPreBackup)
  public async checkPreBackup({
    backupId,
    features,
    deviceId,
  }: {
    backupId: number
    features: string[]
    deviceId?: DeviceId
  }): Promise<ResultObject<PreBackup>> {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "PRE_BACKUP",
      method: "GET",
      body: {
        backupId,
      },
    })

    return this.parsePreBackupResponse(response, features)
  }

  @IpcEvent(APIBackupServiceEvents.PostBackup)
  public async postBackup({
    backupId,
    deviceId,
  }: {
    backupId: number
    deviceId?: DeviceId
  }): Promise<ResultObject<undefined>> {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "POST_BACKUP",
      method: "POST",
      body: {
        backupId,
      },
    })

    if (response.ok) {
      return Result.success(undefined)
    }

    return Result.failed(response.error)
  }

  private parsePreBackupResponse(
    response: ResultObject<ApiResponse<unknown>, string | number, unknown>,
    features: string[]
  ) {
    if (!response.ok) {
      return Result.failed(response.error)
    }

    if (response.data.status === 200) {
      const parsedResponse200 = PreBackupValidator200(features).safeParse(
        response.data.body
      )

      if (parsedResponse200.success) {
        return Result.success(parsedResponse200.data)
      }
    }
    if (response.data.status === 202) {
      const parsedResponse202 = PreBackupValidator202(features).safeParse(
        response.data.body
      )

      if (parsedResponse202.success) {
        return Result.success(parsedResponse202.data)
      }
    }

    return Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
  }
}
