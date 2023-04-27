/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { DeviceFileSystemService } from "App/device-file-system/services"
import {
  DeviceType,
  Endpoint,
  Method,
  OnboardingState,
  PhoneLockCategory,
} from "App/device/constants"
import { SettingsService } from "App/settings/services"
import { UpdateErrorServiceErrors } from "App/update/constants"
import { UpdateOS } from "App/update/dto"
import { join } from "path"
import { DeviceManager } from "App/device-manager/services"
import * as fs from "fs"
import { DeviceInfoService } from "App/device-info/services"

export class DeviceUpdateService {
  constructor(
    private settingsService: SettingsService,
    private deviceManager: DeviceManager,
    private deviceFileSystem: DeviceFileSystemService,
    private deviceInfoService: DeviceInfoService
  ) {}

  public async updateOs(payload: UpdateOS): Promise<ResultObject<boolean>> {
    const deviceInfoResult = await this.deviceInfoService.getDeviceInfo()

    if (!deviceInfoResult.ok || !deviceInfoResult.data) {
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.CannotGetOsVersion,
          "Current os version request failed"
        )
      )
    }

    if (deviceInfoResult.data.onboardingState === OnboardingState.InProgress) {
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.OnboardingNotComplete,
          "Onboarding not complete"
        )
      )
    }

    const filePath = join(
      this.settingsService.getByKey("osDownloadLocation") as string,
      payload.fileName
    )

    const targetPath = deviceInfoResult.data.updateFilePath
    await this.deviceFileSystem.removeDeviceFile(targetPath)

    const fileSizeInMB = fs.lstatSync(filePath).size / (1024 * 1024)
    const freeSpaceResult = await this.deviceInfoService.getDeviceFreeSpace()

    if (
      freeSpaceResult.ok &&
      !isNaN(freeSpaceResult.data) &&
      freeSpaceResult.data < fileSizeInMB
    ) {
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.NotEnoughSpace,
          `Cannot upload ${filePath} to device - not enough space`
        )
      )
    }

    const fileResponse = await this.deviceFileSystem.uploadFileLocally({
      filePath,
      targetPath,
    })

    if (!fileResponse.ok || !fileResponse.data) {
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.UpdateFileUpload,
          `Cannot upload ${filePath} to device`
        )
      )
    }

    const pureUpdateResponse = await this.deviceManager.device.request({
      endpoint: Endpoint.Update,
      method: Method.Post,
      body: {
        update: true,
        reboot: true,
      },
      options: {
        connectionTimeOut: 120000,
      },
    })

    if (!pureUpdateResponse.ok) {
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.UpdateCommand,
          "Cannot restart device"
        )
      )
    }

    const deviceRestartResponse = await this.waitUntilDeviceRestart()

    if (!deviceRestartResponse.ok) {
      return deviceRestartResponse
    }

    if (this.deviceManager.device.deviceType === DeviceType.MuditaPure) {
      const deviceUnlockedResponse = await this.waitUntilDeviceUnlocked()

      if (!deviceUnlockedResponse.ok) {
        return deviceUnlockedResponse
      }
    }

    const deviceInfoAfterUpdateResult =
      await this.deviceInfoService.getDeviceInfo()

    if (!deviceInfoAfterUpdateResult.ok || !deviceInfoAfterUpdateResult.data) {
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.CannotGetOsVersion,
          "New os version request failed"
        )
      )
    }

    const afterUpdateOsVersion = deviceInfoAfterUpdateResult.data.osVersion
    const beforeUpdateOsVersion = deviceInfoResult.data.osVersion

    if (beforeUpdateOsVersion === afterUpdateOsVersion) {
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.VersionDoesntChanged,
          "The version OS isn't changed"
        )
      )
    }

    return Result.success(true)
  }

  private async getUnlockDeviceStatus(): Promise<
    ResultObject<RequestResponseStatus>
  > {
    const { ok, error } = await this.deviceManager.device.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return Result.success(ok ? RequestResponseStatus.Ok : error?.payload.status)
  }

  private async waitUntilDeviceRestart(
    index = 0,
    deviceType = this.deviceManager.device.deviceType,
    timeout = 10000,
    callsMax = 60
  ): Promise<ResultObject<boolean>> {
    if (index === callsMax) {
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.RequestLimitExceeded,
          "The device no restart successful in 10 minutes"
        )
      )
    }

    let result: { ok: boolean }

    try {
      if (deviceType === DeviceType.MuditaHarmony) {
        result = await this.deviceInfoService.getDeviceInfo()
      } else {
        result = await this.getUnlockDeviceStatus()
      }

      if (index !== 0 && result.ok) {
        return Result.success(true)
      }
    } catch {
      // the error is ignored intentionally because the process handles restarting a device
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.waitUntilDeviceRestart(++index, deviceType))
      }, timeout)
    })
  }

  private async waitUntilDeviceUnlocked(
    index = 0,
    timeout = 5000,
    callsMax = 120
  ): Promise<ResultObject<boolean>> {
    if (index === callsMax) {
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.RequestLimitExceeded,
          "The device isn't unlocked by user in 10 minutes"
        )
      )
    }

    const response = await this.getUnlockDeviceStatus()

    if (
      index !== 0 &&
      response.ok &&
      response.data === RequestResponseStatus.Ok
    ) {
      return Result.success(true)
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.waitUntilDeviceUnlocked(++index))
        }, timeout)
      })
    }
  }
}
