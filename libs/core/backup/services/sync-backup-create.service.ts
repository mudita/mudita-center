/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { BackupError } from "Core/backup/constants"
import { MetadataStore, MetadataKey } from "Core/metadata"
import { TokenOptions } from "Core/file-system/services/crypto-file-service/crypto-file-service"
import { DeviceProtocol } from "device-protocol/feature"
import { DeviceFileSystemService } from "Core/device-file-system/services"
import { Endpoint, Method } from "core-device/models"
import { BackupCategory, BackupState } from "Core/device"
import {
  DeviceInfo,
  GetBackupDeviceStatusRequestConfigBody,
  GetBackupDeviceStatusResponseBody,
} from "Core/device/types/mudita-os"

export interface createSyncBackupOptions
  extends Partial<Pick<TokenOptions, "key">> {
  cwd: string
  token?: string
  extract?: boolean
}

export class SyncBackupCreateService {
  constructor(
    public deviceProtocol: DeviceProtocol,
    public deviceFileSystem: DeviceFileSystemService,
    private keyStorage: MetadataStore
  ) {}

  public async createSyncBackup(
    options: createSyncBackupOptions,
    deviceId = this.deviceProtocol.device.id
  ): Promise<ResultObject<string[] | undefined>> {
    if (this.keyStorage.getValue(MetadataKey.BackupInProgress)) {
      return Result.failed(
        new AppError(BackupError.BackupInProgress, "Backup is in progress")
      )
    }

    this.keyStorage.setValue(MetadataKey.BackupInProgress, true)

    const runDeviceSyncBackupResponse = await this.runDeviceSyncBackup(deviceId)

    if (!runDeviceSyncBackupResponse.ok || !runDeviceSyncBackupResponse.data) {
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
      options,
      deviceId
    )

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

  private async runDeviceSyncBackup(
    deviceId = this.deviceProtocol.device.id
  ): Promise<ResultObject<string | undefined>> {
    const deviceResponse = await this.deviceProtocol.request<DeviceInfo>(
      deviceId,
      {
        endpoint: Endpoint.DeviceInfo,
        method: Method.Get,
      }
    )

    if (!deviceResponse.ok || !deviceResponse.data) {
      return Result.failed(
        new AppError(
          BackupError.CannotGetDeviceInfo,
          "Pure OS Backup Pure Location is undefined"
        )
      )
    }

    // id field as backup response is a deprecated field after Pure_1.6.0 & Harmony_1.9.0 (UDM releases)
    const backupResponse = await this.deviceProtocol.request<{
      id?: string
    }>(deviceId, {
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
    const backupId = String(backupResponse.data?.id)
    const backupLocation = String(deviceResponse.data?.backupLocation)

    // id field as backup response is a deprecated field after Pure_1.6.0 & Harmony_1.9.0 (UDM releases)
    const id = deviceResponse.data.syncFilePath
      ? deviceResponse.data.syncFilePath
      : backupId

    const syncBackupFinished = await this.waitUntilBackupDeviceFinished(
      id,
      undefined,
      deviceId
    )
    if (!syncBackupFinished.ok) {
      return Result.failed(
        new AppError(
          BackupError.CannotBackupDevice,
          "Start sync backup Device returns error"
        )
      )
    }
    // syncFilePath is a target `filePath` for download backups after Pure_1.6.0 & Harmony_1.9.0 (UDM releases)
    const filePath = deviceResponse.data.syncFilePath
      ? deviceResponse.data.syncFilePath
      : `${backupLocation}/${backupId}`

    return Result.success(filePath)
  }

  private async waitUntilBackupDeviceFinished(
    id: string,
    iteration = 0,
    deviceId = this.deviceProtocol.device.id
  ): Promise<ResultObject<GetBackupDeviceStatusResponseBody>> {
    try {
      const result = await this.getBackupDeviceStatus(
        {
          id,
        },
        deviceId
      )

      if (!result.ok || result.data?.state === BackupState.Error) {
        return Result.failed(new AppError("", ""))
      } else if (result.data?.state === BackupState.Finished) {
        return result
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              this.waitUntilBackupDeviceFinished(id, iteration + 1, deviceId)
            )
          }, 1000)
        })
      }
    } catch (error) {
      return Result.failed(new AppError("", ""))
    }
  }

  public async getBackupDeviceStatus(
    config: GetBackupDeviceStatusRequestConfigBody,
    deviceId = this.deviceProtocol.device.id
  ): Promise<ResultObject<GetBackupDeviceStatusResponseBody>> {
    return await this.deviceProtocol.request(deviceId, {
      endpoint: Endpoint.Backup,
      method: Method.Get,
      body: {
        ...config,
        category: BackupCategory.Sync,
      },
    })
  }
}
