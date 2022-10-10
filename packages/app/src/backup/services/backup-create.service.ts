/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Endpoint,
  Method,
  GetBackupDeviceStatusDataState,
  BackupCategory,
} from "@mudita/pure"
import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { isResponseSuccessWithData } from "App/core/helpers"
import { BackupError } from "App/backup/constants"
import { MetadataStore, MetadataKey } from "App/metadata"
import { CreateDeviceBackup } from "App/backup/types"

// DEPRECATED
import DeviceService from "App/__deprecated__/backend/device-service"
import DeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"

export class BackupCreateService {
  constructor(
    private deviceService: DeviceService,
    private deviceFileSystem: DeviceFileSystemAdapter,
    private keyStorage: MetadataStore
  ) {}

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

    const filePath = runDeviceBackupResponse.data

    const backupFile = await this.deviceFileSystem.downloadDeviceFilesLocally(
      [filePath],
      options
    )

    if (!isResponseSuccessWithData(backupFile)) {
      this.keyStorage.setValue(MetadataKey.BackupInProgress, false)

      return Result.failed(
        new AppError(BackupError.BackupDownloadFailed, "Download backup fails")
      )
    }

    // TODO: Moved removing backup logic to OS
    await this.deviceFileSystem.removeDeviceFile(filePath)

    this.keyStorage.setValue(MetadataKey.BackupInProgress, false)

    return Result.success(backupFile.data)
  }

  private async runDeviceBackup(): Promise<ResultObject<string | undefined>> {
    const deviceResponse = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (!isResponseSuccessWithData(deviceResponse)) {
      return Result.failed(
        new AppError(
          BackupError.CannotGetDeviceInfo,
          "Pure OS Backup Pure Location is undefined"
        )
      )
    }

    const backupResponse = await this.deviceService.request({
      endpoint: Endpoint.Backup,
      method: Method.Post,
      body: {
        category: BackupCategory.Backup,
      },
    })

    if (!isResponseSuccessWithData(backupResponse) || !backupResponse.data) {
      return Result.failed(
        new AppError(
          BackupError.CannotBackupDevice,
          "Start backup Device returns error"
        )
      )
    }

    const backupId = backupResponse.data.id

    const backupFinished = await this.waitUntilBackupDeviceFinished(backupId)

    if (!backupFinished.ok && backupFinished.error) {
      return Result.failed(
        new AppError(backupFinished.error.type, backupFinished.error.message)
      )
    }

    const filePath = `${deviceResponse.data.backupLocation}/${backupId}`

    return Result.success(filePath)
  }

  private async waitUntilBackupDeviceFinished(
    id: string
  ): Promise<ResultObject<boolean | undefined>> {
    const response = await this.deviceService.request({
      endpoint: Endpoint.Backup,
      method: Method.Get,
      body: {
        id,
      },
    })

    if (
      !isResponseSuccessWithData(response) ||
      response.data?.state === GetBackupDeviceStatusDataState.Error
    ) {
      return Result.failed(
        new AppError(
          BackupError.BackupProcessFailed,
          "Something went wrong during backup process"
        )
      )
    } else if (
      response.data?.state === GetBackupDeviceStatusDataState.Finished
    ) {
      return Result.success(true)
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.waitUntilBackupDeviceFinished(id))
        }, 1000)
      })
    }
  }
}
