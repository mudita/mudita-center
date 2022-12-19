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
  PhoneLockCategory,
} from "App/device/constants"
import { GetDeviceInfoResponseBody } from "App/device/types/mudita-os"
import { DeviceInfo } from "App/device/types/mudita-os/serialport-request.type"
import { SettingsService } from "App/settings/services"
import { UpdateErrorServiceErrors } from "App/update/constants"
import { UpdateOS } from "App/update/dto"
import { join } from "path"
import { DeviceManager } from "App/device-manager/services"
import { MetadataKey, MetadataStore } from "App/metadata"

export class DeviceUpdateService {
  constructor(
    private settingsService: SettingsService,
    private deviceManager: DeviceManager,
    private deviceFileSystem: DeviceFileSystemService,
    private keyStorage: MetadataStore
  ) {}

  public async updateOs(payload: UpdateOS): Promise<ResultObject<boolean>> {
    this.keyStorage.setValue(MetadataKey.UpdateInProgress, true)
    const deviceInfoResult = await this.getDeviceInfo()

    if (!deviceInfoResult.ok || !deviceInfoResult.data) {
      this.keyStorage.setValue(MetadataKey.UpdateInProgress, false)
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.CannotGetOsVersion,
          "Current os version request failed"
        )
      )
    }

    const filePath = join(
      this.settingsService.getByKey("osDownloadLocation") as string,
      payload.fileName
    )

    const fileResponse = await this.deviceFileSystem.uploadFileLocally({
      filePath,
      targetPath: "/sys/user/update.tar",
    })

    if (!fileResponse.ok || !fileResponse.data) {
      this.keyStorage.setValue(MetadataKey.UpdateInProgress, false)
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
    })

    if (!pureUpdateResponse.ok) {
      this.keyStorage.setValue(MetadataKey.UpdateInProgress, false)
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.UpdateCommand,
          "Cannot restart device"
        )
      )
    }

    const deviceRestartResponse = await this.waitUntilDeviceRestart()

    if (!deviceRestartResponse.ok) {
      this.keyStorage.setValue(MetadataKey.UpdateInProgress, false)
      return deviceRestartResponse
    }

    if (this.deviceManager.device.deviceType === DeviceType.MuditaPure) {
      const deviceUnlockedResponse = await this.waitUntilDeviceUnlocked()

      if (!deviceUnlockedResponse.ok) {
        this.keyStorage.setValue(MetadataKey.UpdateInProgress, false)
        return deviceUnlockedResponse
      }
    }

    const deviceInfoAfterUpdateResult = await this.getDeviceInfo()

    if (!deviceInfoAfterUpdateResult.ok || !deviceInfoAfterUpdateResult.data) {
      this.keyStorage.setValue(MetadataKey.UpdateInProgress, false)
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.CannotGetOsVersion,
          "New os version request failed"
        )
      )
    }

    const afterUpdateOsVersion = deviceInfoAfterUpdateResult.data.version
    const beforeUpdateOsVersion = deviceInfoResult.data.version

    if (beforeUpdateOsVersion === afterUpdateOsVersion) {
      this.keyStorage.setValue(MetadataKey.UpdateInProgress, false)
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.VersionDoesntChanged,
          "The version OS isn't changed"
        )
      )
    }

    this.keyStorage.setValue(MetadataKey.UpdateInProgress, false)

    return Result.success(true)
  }

  private async getDeviceInfo(): Promise<ResultObject<DeviceInfo>> {
    const { ok, data, error } =
      await this.deviceManager.device.request<GetDeviceInfoResponseBody>({
        endpoint: Endpoint.DeviceInfo,
        method: Method.Get,
      })

    if (!ok || data === undefined) {
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.CannotGetDeviceInfo,
          error?.message || "Device info request failed"
        )
      )
    } else {
      return Result.success(data)
    }
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

    let response

    try {
      if (deviceType === DeviceType.MuditaHarmony) {
        response = await this.getDeviceInfo()
      } else {
        response = await this.getUnlockDeviceStatus()
      }

      if (
        index !== 0 &&
        (response.data === RequestResponseStatus.Ok ||
          response.data === RequestResponseStatus.PhoneLocked)
      ) {
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
