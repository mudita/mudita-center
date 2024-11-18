/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "core-device/models"
import { DeviceProtocol } from "device-protocol/feature"
import { BackupCategory } from "Core/device/constants"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { BackupError, Operation } from "Core/backup/constants"
import { MetadataKey, MetadataStore } from "Core/metadata"
import { CreateDeviceBackup } from "Core/backup/types"
import { DeviceFileSystemService } from "Core/device-file-system/services"
import { BaseBackupService } from "Core/backup/services/base-backup.service"
import { FileManagerService } from "Core/files-manager/services"
import { DeviceDirectory } from "Core/files-manager/constants"
import { DeviceInfoService } from "Core/device-info/services"
import { extract } from "tar"
import { remove } from "fs-extra"

export class BackupCreateService extends BaseBackupService {
  constructor(
    protected deviceProtocol: DeviceProtocol,
    protected deviceFileSystem: DeviceFileSystemService,
    protected fileManagerService: FileManagerService,
    protected deviceInfoService: DeviceInfoService,
    private keyStorage: MetadataStore
  ) {
    super(deviceProtocol, deviceFileSystem, deviceInfoService)
  }

  public async createBackup(
    options: CreateDeviceBackup,
    deviceId = this.deviceProtocol.device.id
  ): Promise<ResultObject<string[] | undefined>> {
    if (this.keyStorage.getValue(MetadataKey.BackupInProgress)) {
      return Result.failed(
        new AppError(BackupError.BackupInProgress, "Backup is in progress")
      )
    }

    this.keyStorage.setValue(MetadataKey.BackupInProgress, true)

    const validateRequiredBackupSpaceResult =
      await this.validateRequiredBackupSpace(deviceId)

    if (!validateRequiredBackupSpaceResult.ok) {
      this.keyStorage.setValue(MetadataKey.BackupInProgress, false)
      return validateRequiredBackupSpaceResult
    }

    const runDeviceBackupResult = await this.runDeviceBackup(deviceId)

    if (!runDeviceBackupResult.ok || !runDeviceBackupResult.data) {
      this.keyStorage.setValue(MetadataKey.BackupInProgress, false)

      return Result.failed(
        new AppError(
          BackupError.CannotReachBackupLocation,
          "Cannot find backup on device"
        )
      )
    }

    const operationStatus = await this.checkStatus(Operation.Backup, deviceId)

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
        options,
        deviceId
      )

    if (!backupFileResult.ok || !backupFileResult.data) {
      this.keyStorage.setValue(MetadataKey.BackupInProgress, false)

      return Result.failed(
        new AppError(BackupError.BackupDownloadFailed, "Download backup fails")
      )
    }

    // TODO: Moved removing backup logic to OS
    await this.deviceFileSystem.removeDeviceFile(filePath, deviceId)

    this.keyStorage.setValue(MetadataKey.BackupInProgress, false)

    if (options.extract) {
      await extract({
        file: backupFileResult.data[0],
        cwd: options.cwd,
      })
      await remove(backupFileResult.data[0])
    }

    return Result.success(backupFileResult.data)
  }

  private async runDeviceBackup(
    deviceId = this.deviceProtocol.device.id
  ): Promise<ResultObject<string | undefined>> {
    const deviceInfoResult = await this.deviceInfoService.getDeviceInfo(
      deviceId
    )

    if (!deviceInfoResult.ok || !deviceInfoResult.data) {
      return Result.failed(
        new AppError(
          BackupError.CannotGetDeviceInfo,
          "Pure OS Backup Pure Location is undefined"
        )
      )
    }

    const backupResponse = await this.deviceProtocol.request(deviceId, {
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

    const backupFinished = await this.waitUntilProcessFinished(deviceId)

    if (!backupFinished.ok && backupFinished.error) {
      return Result.failed(
        new AppError(backupFinished.error.type, backupFinished.error.message)
      )
    }

    const filePath = deviceInfoResult.data.backupFilePath

    return Result.success(filePath)
  }

  private async validateRequiredBackupSpace(
    deviceId = this.deviceProtocol.device.id
  ): Promise<ResultObject<undefined, BackupError>> {
    const getDeviceFilesResult = await this.fileManagerService.getDeviceFiles(
      {
        directory: DeviceDirectory.DB,
      },
      deviceId
    )

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
    const backupSizeRequired = backupSize * 2 + 100
    const deviceInfoResult = await this.deviceInfoService.getDeviceInfo(
      deviceId
    )

    if (!deviceInfoResult.ok || !deviceInfoResult.data) {
      return Result.failed(
        new AppError(
          BackupError.BackupSpaceIsNotEnough,
          "Device space returned is undefined"
        )
      )
    }
    const { total, usedUserSpace, reservedSpace } =
      deviceInfoResult.data.memorySpace
    const free = total - usedUserSpace - reservedSpace

    if (backupSizeRequired <= free) {
      return Result.success(undefined)
    } else {
      return Result.failed(
        new AppError(
          BackupError.BackupSpaceIsNotEnough,
          `Backup space is not enough`,
          backupSizeRequired
        )
      )
    }
  }
}
