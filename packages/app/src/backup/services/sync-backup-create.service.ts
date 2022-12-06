/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { BackupError } from "App/backup/constants"
import { MetadataStore, MetadataKey } from "App/metadata"
import { TokenOptions } from "App/file-system/services/crypto-file-service/crypto-file-service"
import { DeviceManager } from "App/device-manager/services"
import { DeviceFileSystemService } from "App/device-file-system/services"
import { BackupCategory, BackupState, Endpoint, Method } from "App/device"
import {
  DeviceInfo,
  GetBackupDeviceStatusRequestConfigBody,
  GetBackupDeviceStatusResponseBody,
} from "App/device/types/mudita-os"

export interface createSyncBackupOptions
  extends Pick<Partial<TokenOptions>, "key"> {
  cwd: string
  token?: string
  extract?: boolean
}

export class SyncBackupCreateService {
  constructor(
    public deviceManager: DeviceManager,
    public deviceFileSystem: DeviceFileSystemService,
    private keyStorage: MetadataStore
  ) {}

  public async createSyncBackup(
    options: createSyncBackupOptions
  ): Promise<ResultObject<string[] | undefined>> {
    if (this.keyStorage.getValue(MetadataKey.BackupInProgress)) {
      return Result.failed(
        new AppError(BackupError.BackupInProgress, "Backup is in progress")
      )
    }

    this.keyStorage.setValue(MetadataKey.BackupInProgress, true)

    const runDeviceSyncBackupResponse = await this.runDeviceSyncBackup()

    if (!runDeviceSyncBackupResponse.data) {
      this.keyStorage.setValue(MetadataKey.BackupInProgress, false)

      return Result.failed(
        new AppError(
          BackupError.CannotReachBackupLocation,
          "Cannot find sync backup on device"
        )
      )
    }

    const filePath = runDeviceSyncBackupResponse.data

    const backupFile = await this.deviceFileSystem.downloadDeviceFilesLocally(
      [filePath],
      options
    )

    console.log("createSyncBackup backupFile: ", backupFile)

    if (!backupFile.ok || !backupFile.data) {
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

  private async runDeviceSyncBackup(): Promise<
    ResultObject<string | undefined>
  > {
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
        category: BackupCategory.Sync,
      },
    })

    if (!backupResponse.ok) {
      return Result.failed(
        new AppError(
          BackupError.CannotBackupDevice,
          "Start sync backup Device returns error"
        )
      )
    }

    const syncBackupFinished = await this.waitUntilBackupDeviceFinished(
      deviceResponse.data.syncFilePath
    )
    console.log("syncBackupFinished: ", syncBackupFinished)

    if (!syncBackupFinished.ok) {
      return Result.failed(
        new AppError(
          BackupError.CannotBackupDevice,
          "Start sync backup Device returns error"
        )
      )
    }

    const filePath = deviceResponse.data.syncFilePath

    return Result.success(filePath)
  }

  private async waitUntilBackupDeviceFinished(
    id: string
  ): Promise<ResultObject<GetBackupDeviceStatusResponseBody>> {
    const result = await this.getBackupDeviceStatus({
      id,
    })

    if (!result.ok || result.data?.state === BackupState.Error) {
      return Result.failed(new AppError("", ""))
    } else if (result.data?.state === BackupState.Finished) {
      return result
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.waitUntilBackupDeviceFinished(id))
        }, 1000)
      })
    }
  }

  public async getBackupDeviceStatus(
    config: GetBackupDeviceStatusRequestConfigBody
  ): Promise<ResultObject<GetBackupDeviceStatusResponseBody>> {
    return await this.deviceManager.device.request({
      endpoint: Endpoint.Backup,
      method: Method.Get,
      body: {
        ...config,
        category: BackupCategory.Sync,
      },
    })
  }
}
