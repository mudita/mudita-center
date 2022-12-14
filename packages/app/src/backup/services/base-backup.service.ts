/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, PhoneLockCategory } from "App/device"
import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { Operation, BackupError } from "App/backup/constants"
import { UpdaterStatus } from "App/backup/dto"
import { DeviceManager } from "App/device-manager/services"
import { DeviceFileSystemService } from "App/device-file-system/services"
import { DeviceInfo } from "App/device/types/mudita-os"

export class BaseBackupService {
  private MAX_WAKE_UP_RETRIES = 24
  private REQUEST_TIME_OUT = 5000

  constructor(
    protected deviceManager: DeviceManager,
    protected  deviceFileSystem: DeviceFileSystemService
  ) {}

  public async checkStatus(
    operation: Operation
  ): Promise<ResultObject<boolean | undefined>> {
    const deviceResponse = await this.deviceManager.device.request<DeviceInfo>({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (!deviceResponse.ok || !deviceResponse.data) {
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

    if (!response.ok || !response.data) {
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
          `The operation ${operation} doesn't match to operation type ${result.operation}`
        )
      )
    }
  }

  public async waitUntilProcessFinished(): Promise<
    ResultObject<boolean | undefined>
  > {
    const wakeUpResponse = await this.waitUntilDeviceResponse()

    if (!wakeUpResponse) {
      return Result.failed(
        new AppError(BackupError.OperationTimeout, "Device didn't wake up")
      )
    }

    const unlockResponse = await this.waitUntilGetUnlockDeviceStatusResponse()

    if (unlockResponse) {
      return Result.success(true)
    } else {
      return Result.failed(
        new AppError(BackupError.DeviceLocked, "Device is locked")
      )
    }
  }

  private async waitUntilDeviceResponse(index = 0): Promise<boolean> {
    if (index === this.MAX_WAKE_UP_RETRIES) {
      return false
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        void (async () => {
          try {
            const response = await this.deviceManager.device.request({
              endpoint: Endpoint.DeviceInfo,
              method: Method.Get,
            })

            if (response.ok) {
              resolve(true)
              return
            }

            resolve(this.waitUntilDeviceResponse(++index))
          } catch (e) {
            resolve(this.waitUntilDeviceResponse(++index))
          }
        })()
      }, this.REQUEST_TIME_OUT)
    })
  }

  private async waitUntilGetUnlockDeviceStatusResponse(
    index = 0
  ): Promise<boolean> {
    if (index === this.REQUEST_TIME_OUT) {
      return false
    }

    const response = await this.deviceManager.device.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })

    if (response.ok) {
      return true
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.waitUntilGetUnlockDeviceStatusResponse(++index))
        }, this.REQUEST_TIME_OUT)
      })
    }
  }
}
