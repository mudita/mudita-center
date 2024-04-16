/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "Core/device/constants"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import CryptoFileService from "Core/file-system/services/crypto-file-service/crypto-file-service"
import { RestoreDeviceBackup } from "Core/backup/types"
import { BackupError, Operation } from "Core/backup/constants"
import { DeviceFileSystemService } from "Core/device-file-system/services"
import { DeviceManager } from "Core/device-manager/services"
import { BaseBackupService } from "Core/backup/services/base-backup.service"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { DeviceInfoService } from "Core/device-info/services"

export class BackupRestoreService extends BaseBackupService {
  constructor(
    protected deviceManager: DeviceManager,
    protected deviceFileSystem: DeviceFileSystemService,
    protected deviceInfoService: DeviceInfoService,
    private fileSystem: FileSystemService
  ) {
    super(deviceManager, deviceFileSystem, deviceInfoService)
  }

  public async restoreBackup({
    filePath,
    backupFilePath,
    token,
  }: RestoreDeviceBackup): Promise<ResultObject<boolean, BackupError>> {
    const backupId = backupFilePath.split("/").pop() as string

    if (!(await this.fileSystem.exists(filePath))) {
      return Result.failed(
        new AppError(BackupError.BackupFileNotFound, `Backup file not found`)
      )
    }

    const validBackup = await this.fileSystem.validateEncryptedZippedFile(
      filePath,
      token
    )

    if (!validBackup) {
      return Result.failed(
        new AppError(BackupError.InvalidToken, `File: token is incorrect`)
      )
    }

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
      targetPath: backupFilePath,
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
