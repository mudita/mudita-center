/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Endpoint,
  Method,
  BackupCategory,
  BackupState,
} from "App/device/constants"
import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { BackupError } from "App/backup/constants"
import { MetadataStore, MetadataKey } from "App/metadata"
import { CreateDeviceBackup } from "App/backup/types"
import { DeviceFileSystemService } from "App/device-file-system/services"
import { DeviceManager } from "App/device-manager/services"
import {
  StartBackupResponseBody,
  GetDeviceInfoResponseBody,
  GetBackupDeviceStatusResponseBody,
} from "App/device/types/mudita-os"

export class BackupCreateService extends BaseBackupService {
  constructor(
    private deviceManager: DeviceManager,
    private deviceFileSystem: DeviceFileSystemService,
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

    const runDeviceBackupResponse = await this.runDeviceBackup()

    if (!runDeviceBackupResponse.data) {
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

    const filePath = runDeviceBackupResponse.data

    const backupFileResult = await this.deviceFileSystem.downloadDeviceFilesLocally(
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
    const deviceResponse = await this.deviceManager.request({
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

    const backupResponse = await this.deviceManager.request({
      endpoint: Endpoint.Backup,
      method: Method.Post,
      body: {
        category: BackupCategory.Backup,
      },
    })

    if (!isResponseSuccess(backupResponse)) {
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

    const filePath = `${deviceResponse.data.backupLocation}/backup_db.tar`

    return Result.success(filePath)
  }
}
