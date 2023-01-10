/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, BackupCategory } from "App/device/constants"
import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { BackupError, Operation } from "App/backup/constants"
import { MetadataStore, MetadataKey } from "App/metadata"
import { CreateDeviceBackup } from "App/backup/types"
import { DeviceFileSystemService } from "App/device-file-system/services"
import { DeviceManager } from "App/device-manager/services"
import { BaseBackupService } from "App/backup/services/base-backup.service"
import { DeviceInfo } from "App/device/types/mudita-os"
import { FileManagerService } from "App/files-manager/services"
import { DeviceDirectory } from "App/files-manager/constants"

export class BackupCreateService extends BaseBackupService {
  constructor(
    protected deviceManager: DeviceManager,
    protected deviceFileSystem: DeviceFileSystemService,
    protected fileManagerService: FileManagerService,
    private keyStorage: MetadataStore
  ) {
    super(deviceManager, deviceFileSystem)
  }

  public async createBackup(
    options: CreateDeviceBackup
  ): Promise<ResultObject<string[] | undefined>> {
    if (this.keyStorage.getValue(MetadataKey.BackupInProgress)) {
      return Result.failed(
        new AppError(BackupError.BackupInProgress, "Backup is in progress")
      )
    }

    this.keyStorage.setValue(MetadataKey.BackupInProgress, true)

    const validateRequiredBackupSpaceResult =
      await this.validateRequiredBackupSpace()

    if (!validateRequiredBackupSpaceResult.ok) {
      return validateRequiredBackupSpaceResult
    }

    const runDeviceBackupResult = await this.runDeviceBackup()

    if (!runDeviceBackupResult.ok || !runDeviceBackupResult.data) {
      this.keyStorage.setValue(MetadataKey.BackupInProgress, false)

      return Result.failed(
        new AppError(
          BackupError.CannotReachBackupLocation,
          "Cannot find backup on device"
        )
      )
    }

    const operationStatus = await this.checkStatus(Operation.Backup)

    if (!operationStatus.ok) {
      this.keyStorage.setValue(MetadataKey.BackupInProgress, false)

      return Result.failed(
        new AppError(
          BackupError.BackupProcessFailed,
          "Device backup operation failed"
        )
      )
    }

    const filePath = runDeviceBackupResult.data

    const backupFileResult =
      await this.deviceFileSystem.downloadDeviceFilesLocally(
        [filePath],
        options
      )

    if (!backupFileResult.ok || !backupFileResult.data) {
      this.keyStorage.setValue(MetadataKey.BackupInProgress, false)

      return Result.failed(
        new AppError(BackupError.BackupDownloadFailed, "Download backup fails")
      )
    }

    // TODO: Moved removing backup logic to OS
    await this.deviceFileSystem.removeDeviceFile(filePath)

    this.keyStorage.setValue(MetadataKey.BackupInProgress, false)

    return Result.success(backupFileResult.data)
  }

  private async runDeviceBackup(): Promise<ResultObject<string | undefined>> {
    const deviceResponse = await this.deviceManager.device.request<DeviceInfo>({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (!deviceResponse.ok || !deviceResponse.data) {
      return Result.failed(
        new AppError(
          BackupError.CannotGetDeviceInfo,
          "Pure OS Backup Pure Location is undefined"
        )
      )
    }

    const backupResponse = await this.deviceManager.device.request({
      endpoint: Endpoint.Backup,
      method: Method.Post,
      body: {
        category: BackupCategory.Backup,
      },
    })

    if (!backupResponse.ok) {
      return Result.failed(
        new AppError(
          BackupError.CannotBackupDevice,
          "Start backup Device returns error"
        )
      )
    }

    const backupFinished = await this.waitUntilProcessFinished()

    if (!backupFinished.ok && backupFinished.error) {
      return Result.failed(
        new AppError(backupFinished.error.type, backupFinished.error.message)
      )
    }

    const filePath = deviceResponse.data.backupFilePath

    return Result.success(filePath)
  }

  private async validateRequiredBackupSpace(): Promise<
    ResultObject<undefined, BackupError>
  > {
    const getDeviceFilesResult = await this.fileManagerService.getDeviceFiles({
      directory: DeviceDirectory.DB,
    })

    if (!getDeviceFilesResult.ok || getDeviceFilesResult.data === undefined) {
      return Result.failed(
        new AppError(
          BackupError.BackupSpaceIsNotEnough,
          "DB Catalog Size is undefined"
        )
      )
    }

    const backupSize = getDeviceFilesResult.data.reduce((prev, file) => {
      return prev + file.size
    }, 0)
    // 100 MiB as buffer space
    const backupSizeRequaired = backupSize * 2 + 100
    const deviceResult = await this.deviceManager.device.request<DeviceInfo>({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (!deviceResult.ok || !deviceResult.data) {
      return Result.failed(
        new AppError(
          BackupError.BackupSpaceIsNotEnough,
          "Device space returned is undefined"
        )
      )
    }
    const { deviceSpaceTotal, usedUserSpace } = deviceResult.data
    const free = Number(deviceSpaceTotal) - Number(usedUserSpace)

    if (backupSizeRequaired <= free) {
      return Result.success(undefined)
    } else {
      return Promise.resolve(
        Result.failed(
          new AppError(
            BackupError.BackupSpaceIsNotEnough,
            `File: token is incorrect`,
            backupSizeRequaired
          )
        )
      )
    }
  }
}
