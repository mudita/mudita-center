/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Endpoint,
  Method,
  BackupCategory,
  GetBackupDeviceStatusResponseBody,
  GetBackupDeviceStatusDataState, GetBackupDeviceStatusRequestConfigBody,
} from "@mudita/pure"
import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { isResponseSuccessWithData, isResponseSuccess, isResponsesSuccessWithData } from "App/core/helpers"
import { BackupError } from "App/backup/constants"
import { MetadataStore, MetadataKey } from "App/metadata"

// DEPRECATED
import DeviceService from "App/__deprecated__/backend/device-service"
import DeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import { RequestResponse, RequestResponseStatus } from "App/core/types"
import { TokenOptions } from "App/file-system/services/crypto-file-service/crypto-file-service"

export interface createSyncBackupOptions
  extends Pick<Partial<TokenOptions>, "key"> {
  cwd: string
  token?: string
  extract?: boolean
}

export class SyncBackupCreateService {
  constructor(
    public deviceService: DeviceService,
    public deviceFileSystem: DeviceFileSystemAdapter,
    private keyStorage: MetadataStore
  ) {
  }

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

  private async runDeviceSyncBackup(): Promise<ResultObject<string | undefined>> {
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
        category: BackupCategory.Sync,
      },
    })

    if (!isResponseSuccess(backupResponse)) {
      return Result.failed(
        new AppError(
          BackupError.CannotBackupDevice,
          "Start sync backup Device returns error"
        )
      )
    }



    const syncBackupFinished = await this.waitUntilBackupDeviceFinished("")
    console.log("syncBackupFinished: ", syncBackupFinished)

    if (isResponseSuccess(syncBackupFinished)) {
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
    id: string,
  ): Promise<RequestResponse<GetBackupDeviceStatusResponseBody>> {
    const response = await this.getBackupDeviceStatus(
      {
        id,
      }
    )

    if (
      !isResponsesSuccessWithData([response]) ||
      response.data?.state === GetBackupDeviceStatusDataState.Error
    ) {
      return { status: RequestResponseStatus.Error }
    } else if (
      response.data?.state === GetBackupDeviceStatusDataState.Finished
    ) {
      return response
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
  ): Promise<RequestResponse<GetBackupDeviceStatusResponseBody>> {
    return await this.deviceService.request({
      endpoint: Endpoint.Backup,
      method: Method.Get,
      body: {
        ...config,
        category: BackupCategory.Sync
      },
    })
  }
}
