/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError } from "Core/core/errors"
import { DeviceManager } from "Core/device-manager/services"
import { DeviceId } from "Core/device/constants/device-id"
import {
  APIBackupServiceEvents,
  GeneralError,
  PreBackup,
  PreBackupValidator,
} from "device/models"
import _ from "lodash"

export class APIBackupService {
  constructor(private deviceManager: DeviceManager) {}

  @IpcEvent(APIBackupServiceEvents.StartPreBackup)
  public async startPreBackup({
    features,
    deviceId,
  }: {
    features: string[]
    deviceId?: DeviceId
  }): Promise<ResultObject<PreBackup>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const backupId = _.random(1, 100000)

    const response = await device.request({
      endpoint: "PRE_BACKUP",
      method: "POST",
      body: {
        backupId,
        features,
      },
    })

    if (response.ok) {
      const startBackupResponse = PreBackupValidator(features).safeParse(
        response.data.body
      )

      const success =
        startBackupResponse.success &&
        ((response.data.status === 200 && startBackupResponse.data.features) ||
          (response.data.status === 204 && !startBackupResponse.data.features))

      return success
        ? Result.success(startBackupResponse.data as PreBackup)
        : Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }

    return Result.failed(response.error)
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
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

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

    if (response.ok) {
      const startBackupResponse = PreBackupValidator(features).safeParse(
        response.data.body
      )

      const success =
        startBackupResponse.success &&
        ((response.data.status === 200 && startBackupResponse.data.features) ||
          (response.data.status === 204 && !startBackupResponse.data.features))

      return success
        ? Result.success(startBackupResponse.data as PreBackup)
        : Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }

    return Result.failed(response.error)
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
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

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
}
