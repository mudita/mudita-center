/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import {
  Endpoint,
  Method,
  RestoreState,
  DeviceCommunicationError,
} from "App/device/constants"
import { GetRestoreDeviceStatusResponseBody } from "App/device/types/mudita-os"
import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import CryptoFileService from "App/file-system/services/crypto-file-service/crypto-file-service"
import { RestoreDeviceBackup } from "App/backup/types"
import { BackupError } from "App/backup/constants"
import { DeviceFileSystemService } from "App/device-file-system/services"
import { DeviceManager } from "App/device-manager/services"

const timeout = 5000
const callsMax = 24

export class BackupRestoreService {
  constructor(
    private deviceManager: DeviceManager,
    private deviceFileSystem: DeviceFileSystemService
  ) {}

  public async restoreBackup({
    filePath,
    backupLocation,
    token,
  }: RestoreDeviceBackup): Promise<ResultObject<boolean | undefined>> {
    const backupId = filePath.split("/").pop() as string
    const fileData = this.readFile(filePath, token)

    if (!fileData) {
      return Result.failed(
        new AppError(
          BackupError.CannotReadBackupFile,
          `File: ${filePath} is unreadable`
        )
      )
    }

    const uploadResult = await this.deviceFileSystem.uploadFile({
      data: this.arrayBufferToBuffer(fileData),
      targetPath: `${backupLocation}/${backupId}`,
    })

    if (!uploadResult.ok || !uploadResult.data) {
      return Result.failed(
        new AppError(
          BackupError.CannotUploadBackupToDevice,
          uploadResult.error?.message || "Cannot upload backup to device"
        )
      )
    }

    const restoreResult = await this.deviceManager.device.request({
      endpoint: Endpoint.Restore,
      method: Method.Post,
      body: {
        restore: backupId,
      },
    })

    if (!restoreResult.ok) {
      return Result.failed(
        new AppError(
          BackupError.CannotRestoreBackup,
          restoreResult.error?.message || "Cannot restore backup"
        )
      )
    }

    const restoreStatus = await this.waitUntilRestoreDeviceFinished(backupId)

    if (restoreStatus.status !== RequestResponseStatus.Ok) {
      return Result.failed(
        new AppError(
          BackupError.RestoreBackupFailed,
          restoreStatus.error?.message || "Restore failed"
        )
      )
    }

    return Result.success(true)
  }

  private async waitUntilGetRestoreDeviceStatusNoResponse(
    id: string,
    firstRequest = true,
    index = 0
  ): Promise<RequestResponse> {
    if (index === callsMax) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    const response =
      await this.deviceManager.device.request<GetRestoreDeviceStatusResponseBody>(
        {
          endpoint: Endpoint.Restore,
          method: Method.Get,
          body: {
            id,
          },
        }
      )

    if (response.data?.state === RestoreState.Finished) {
      return {
        status: RequestResponseStatus.Ok,
      }
    }

    if (!firstRequest && !response.ok) {
      return { status: RequestResponseStatus.Ok }
    }

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (response.error?.payload?.status === RequestResponseStatus.Error) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    if (
      (response.data as GetRestoreDeviceStatusResponseBody)?.state ===
      RestoreState.Error
    ) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this.waitUntilGetRestoreDeviceStatusNoResponse(id, false, ++index)
        )
      }, timeout)
    })
  }

  private async waitUntilGetUnlockDeviceStatusResponse(
    index = 0
  ): Promise<RequestResponse> {
    if (index === callsMax) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    const response = await this.deviceManager.device.request({
      endpoint: Endpoint.Restore,
      method: Method.Get,
    })

    if (
      response.ok ||
      response.error?.type === DeviceCommunicationError.DeviceLocked
    ) {
      return {
        status: RequestResponseStatus.Ok,
      }
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.waitUntilGetUnlockDeviceStatusResponse(++index))
        }, timeout)
      })
    }
  }

  private async waitUntilRestoreDeviceFinished(
    id: string
  ): Promise<RequestResponse> {
    const response = await this.waitUntilGetRestoreDeviceStatusNoResponse(id)

    if (response.status === RequestResponseStatus.Error) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    return this.waitUntilGetUnlockDeviceStatusResponse()
  }

  private readFile(filePath: string, token: string): Buffer | undefined {
    const buffer = fs.readFileSync(filePath)
    return CryptoFileService.decrypt({ buffer, key: token })
  }

  private arrayBufferToBuffer(unitArray: Uint8Array): Buffer {
    const buffer = Buffer.alloc(unitArray.byteLength)
    const view = new Uint8Array(unitArray)
    for (let i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i]
    }
    return buffer
  }
}
