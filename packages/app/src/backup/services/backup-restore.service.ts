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

export class BackupRestoreService extends BaseBackupService {
  constructor(
    private deviceManager: DeviceManager,
    private deviceFileSystem: DeviceFileSystemService,
    private fileSystem: FileSystemService
  ) {
    super(deviceService, deviceFileSystem)
  }

  public async restoreBackup({
    filePath,
    backupLocation,
    token,
  }: RestoreDeviceBackup): Promise<ResultObject<boolean | undefined>> {
    const backupId = filePath.split("/").pop() as string
    const fileData = await this.readFile(filePath, token)

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

    const restoreStatus = await this.waitUntilProcessFinished()

    if (!restoreStatus.ok) {
      return Result.failed(
        new AppError(
          BackupError.RestoreBackupFailed,
          restoreStatus.error?.message || "Restore failed"
        )
      )
    }

    return this.checkStatus(Operation.Restore)
  }

  private async readFile(
    filePath: string,
    token: string
  ): Promise<Buffer | undefined> {
    try {
      const buffer = await this.fileSystem.readFile(filePath)
      return CryptoFileService.decrypt({ buffer, key: token })
    } catch {
      return
    }
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
