/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError } from "Core/core/errors"
import { DeviceManager } from "Core/device-manager/services"
import { DeviceId } from "Core/device/constants/device-id"
import { ApiResponse } from "Core/device/types/mudita-os"
import {
  APIRestoreServiceEvents,
  GeneralError,
  PreRestore,
  PreRestoreValidator,
  Restore,
  RestoreMetadataValidator,
  RestoreValidator200,
  RestoreValidator202,
} from "device/models"
import random from "lodash/random"
import { ServiceBridge } from "../service-bridge"

export class APIRestoreService {
  constructor(
    private deviceManager: DeviceManager,
    private serviceBridge: ServiceBridge
  ) {}

  @IpcEvent(APIRestoreServiceEvents.PreRestore)
  public async preRestore({
    features,
    deviceId,
  }: {
    features: {
      feature: string
      key: string
    }[]
    deviceId?: DeviceId
  }): Promise<ResultObject<PreRestore>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const restoreId = random(1, 100000)

    const response = await device.request({
      endpoint: "PRE_RESTORE",
      method: "POST",
      body: {
        restoreId,
        features,
      },
    })

    if (response.ok) {
      const startBackupResponse = PreRestoreValidator(
        features.map((item) => item.feature)
      ).safeParse(response.data.body)

      return startBackupResponse.success
        ? Result.success(startBackupResponse.data)
        : Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }

    return Result.failed(response.error)
  }

  @IpcEvent(APIRestoreServiceEvents.StartRestore)
  public async startRestore({
    restoreId,
    deviceId,
  }: {
    restoreId: number
    deviceId?: DeviceId
  }): Promise<ResultObject<Restore>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "RESTORE",
      method: "POST",
      body: {
        restoreId,
      },
    })

    return this.parseRestoreResponse(response)
  }

  @IpcEvent(APIRestoreServiceEvents.CancelRestore)
  public async cancelRestore({
    restoreId,
    deviceId,
  }: {
    restoreId: number
    deviceId?: DeviceId
  }): Promise<ResultObject<undefined>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "RESTORE",
      method: "DELETE",
      body: {
        restoreId,
      },
    })

    console.log(response)

    return response.ok && response.data.status === 200
      ? Result.success(undefined)
      : Result.failed(new AppError(GeneralError.IncorrectResponse))
  }

  @IpcEvent(APIRestoreServiceEvents.CheckRestore)
  public async checkRestore({
    restoreId,
    deviceId,
  }: {
    restoreId: number
    deviceId?: DeviceId
  }): Promise<ResultObject<Restore>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "RESTORE",
      method: "GET",
      body: {
        restoreId,
      },
    })

    return this.parseRestoreResponse(response)
  }

  private parseRestoreResponse(
    response: ResultObject<ApiResponse<unknown>, string | number, unknown>
  ) {
    if (!response.ok) {
      return Result.failed(response.error)
    }

    if (response.data.status === 200) {
      const response200 = RestoreValidator200.safeParse(response.data.body)
      if (response200.success) {
        return Result.success(response200.data)
      }
    }

    if (response.data.status === 202) {
      const response202 = RestoreValidator202.safeParse(response.data.body)

      if (response202.success) {
        return Result.success(response202.data)
      }
    }

    return Result.failed(new AppError(GeneralError.IncorrectResponse))
  }

  @IpcEvent(APIRestoreServiceEvents.LoadBackupMetadata)
  public loadBackupMetadata({ id }: { id: string }) {
    try {
      const file = this.serviceBridge.fileManager.getFile(id)
      const backup = JSON.parse(file as string)

      const response = RestoreMetadataValidator.safeParse({
        header: backup.header,
        features: Object.keys(backup.data),
      })

      if (response.success) {
        return Result.success(response.data)
      }
      return Result.failed(
        new AppError(GeneralError.IncorrectResponse, response.error.message)
      )
    } catch (error) {
      console.error(error)
      return Result.failed(
        new AppError(
          GeneralError.InternalError,
          "Backup metadata could not be parsed"
        )
      )
    }
  }
}
