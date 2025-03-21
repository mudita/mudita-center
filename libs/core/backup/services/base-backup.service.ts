/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "core-device/models"
import { PhoneLockCategory } from "Core/device"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { Operation, BackupError } from "Core/backup/constants"
import { UpdaterStatus } from "Core/backup/dto"
import { DeviceProtocol } from "device-protocol/feature"
import { DeviceFileSystemService } from "Core/device-file-system/services"
import { DeviceInfoService } from "Core/device-info/services"

export class BaseBackupService {
  private MAX_WAKE_UP_RETRIES = 24
  private REQUEST_TIME_OUT = 5000

  constructor(
    protected deviceProtocol: DeviceProtocol,
    protected deviceFileSystem: DeviceFileSystemService,
    protected deviceInfoService: DeviceInfoService
  ) {}

  public async checkStatus(
    operation: Operation,
    deviceId = this.deviceProtocol.device.id
  ): Promise<ResultObject<boolean, BackupError>> {
    const deviceResponse = await this.deviceInfoService.getDeviceInfo(deviceId)

    if (!deviceResponse.ok || !deviceResponse.data) {
      return Result.failed(
        new AppError(
          BackupError.CannotGetDeviceInfo,
          "Mudita OS recovery status is undefined"
        )
      )
    }

    const response = await this.deviceFileSystem.downloadFile(
      deviceResponse.data.recoveryStatusFilePath,
      deviceId
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

  public async waitUntilProcessFinished(
    deviceId = this.deviceProtocol.device.id
  ): Promise<ResultObject<boolean | undefined>> {
    const wakeUpResponse = await this.waitUntilDeviceResponse(
      undefined,
      deviceId
    )

    if (!wakeUpResponse) {
      return Result.failed(
        new AppError(BackupError.OperationTimeout, "Device didn't wake up")
      )
    }

    const unlockResponse = await this.waitUntilGetUnlockDeviceStatusResponse(
      undefined,
      deviceId
    )

    if (unlockResponse) {
      return Result.success(true)
    } else {
      return Result.failed(
        new AppError(BackupError.DeviceLocked, "Device is locked")
      )
    }
  }

  private async waitUntilDeviceResponse(
    index = 0,
    deviceId = this.deviceProtocol.device.id
  ): Promise<boolean> {
    if (index === this.MAX_WAKE_UP_RETRIES) {
      return false
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        void (async () => {
          try {
            const response = await this.deviceInfoService.getDeviceInfo(
              deviceId
            )

            if (response.ok) {
              resolve(true)
              return
            }

            resolve(this.waitUntilDeviceResponse(++index, deviceId))
          } catch (e) {
            resolve(this.waitUntilDeviceResponse(++index, deviceId))
          }
        })()
      }, this.REQUEST_TIME_OUT)
    })
  }

  private async waitUntilGetUnlockDeviceStatusResponse(
    index = 0,
    deviceId = this.deviceProtocol.device.id
  ): Promise<boolean> {
    if (index === this.REQUEST_TIME_OUT) {
      return false
    }

    const response = await this.deviceProtocol.request(deviceId, {
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })

    if (response.ok) {
      return true
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            this.waitUntilGetUnlockDeviceStatusResponse(++index, deviceId)
          )
        }, this.REQUEST_TIME_OUT)
      })
    }
  }
}
