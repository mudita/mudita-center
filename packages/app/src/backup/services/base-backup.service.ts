/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, PhoneLockCategory } from "@mudita/pure"
import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { isResponseSuccessWithData } from "App/core/helpers"
import {
  Operation,
  OperationStatus,
  BackupError,
} from "App/backup/constants"
import { UpdaterStatus } from "App/backup/dto"

// DEPRECATED
import DeviceService from "App/__deprecated__/backend/device-service"
import DeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"

export class BaseBackupService {
  private MAX_WAKE_UP_RETRIES = 24
  private REQUEST_TIME_OUT = 5000

  constructor(
    public deviceService: DeviceService,
    public deviceFileSystem: DeviceFileSystemAdapter
  ) {}

  public async checkStatus(
    operation: Operation
  ): Promise<ResultObject<boolean | undefined>> {
    const deviceResponse = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (!isResponseSuccessWithData(deviceResponse)) {
      return Result.failed(
        new AppError(
          BackupError.CannotGetDeviceInfo,
          "Mudita OS recovery status is undefined"
        )
      )
    }

    const response = await this.deviceFileSystem.downloadFile(
      deviceResponse.data.recoveryStatusFilePath
    )

    if (!isResponseSuccessWithData(response)) {
      return Result.failed(
        new AppError(
          BackupError.CannotGetProcessStatus,
          `Can't get ${deviceResponse.data.recoveryStatusFilePath} from device`
        )
      )
    }

    const result = JSON.parse(response.data.toString("utf8")) as UpdaterStatus

    if (result.operation === operation) {
      if (result.successful) {
        return Result.success(true)
      } else {
        return Result.failed(
          new AppError(
            BackupError.OperationFailed,
            `Operation: ${operation} - Failed`
          )
        )
      }
    } else {
      return Result.failed(
        new AppError(
          BackupError.OperationDoesNotMatch,
          `The operation ${operation} doesn't match to operation type ${result.message}`
        )
      )
    }
  }

  public async waitUntilProcessFinished(): Promise<
    ResultObject<boolean | undefined>
  > {
    const wakeUpResponse = await this.waitUntilDeviceResponse()

    if (wakeUpResponse.status === RequestResponseStatus.Error) {
      return Result.failed(
        new AppError(BackupError.OperationTimeout, "Device didn't wake up")
      )
    }

    const unlockResponse = await this.waitUntilGetUnlockDeviceStatusResponse()

    if (unlockResponse.status === RequestResponseStatus.Ok) {
      return Result.success(true)
    } else {
      return Result.failed(
        new AppError(BackupError.DeviceLocked, "Device is locked")
      )
    }
  }

  private async waitUntilDeviceResponse(
    index = 0
  ): Promise<RequestResponse> {
    if (index === this.MAX_WAKE_UP_RETRIES) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    return new Promise((resolve) => {
      setTimeout(async () => {
        const response = await this.deviceService.request({
          endpoint: Endpoint.DeviceInfo,
          method: Method.Get,
        })

        if (isResponseSuccessWithData(response)) {
          resolve({ status: RequestResponseStatus.Ok })
          return
        }

        resolve(this.waitUntilDeviceResponse(++index))
      }, this.REQUEST_TIME_OUT)
    })
  }

  private async waitUntilGetUnlockDeviceStatusResponse(
    index = 0
  ): Promise<RequestResponse> {
    if (index === this.REQUEST_TIME_OUT) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    const response = await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })

    if (
      response.status === RequestResponseStatus.Ok
    ) {
      return {
        status: RequestResponseStatus.Ok,
      }
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.waitUntilGetUnlockDeviceStatusResponse(++index))
        }, this.REQUEST_TIME_OUT)
      })
    }
  }
}
