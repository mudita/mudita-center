/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError } from "Core/core/errors"
import { DeviceId } from "Core/device/constants/device-id"
import {
  AppInstallationServiceEvents,
  GeneralError,
  GetAppInstallationProgress,
  GetAppInstallationProgressValidator,
  StartAppInstallation,
  StartAppInstallationValidator,
} from "device/models"
import { DeviceProtocol } from "device-protocol/feature"

export class AppInstallationService {
  constructor(private deviceProtocol: DeviceProtocol) {}

  @IpcEvent(AppInstallationServiceEvents.StartAppInstallation)
  public async startAppInstallation({
    filePath,
    deviceId,
  }: {
    filePath: string
    deviceId: DeviceId
  }): Promise<ResultObject<StartAppInstallation>> {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "APP_INSTALL",
      method: "POST",
      body: {
        filePath,
      },
    })

    if (response.ok) {
      const startAppInstallationResponse =
        StartAppInstallationValidator.safeParse(response.data.body)

      const success = startAppInstallationResponse.success

      if (!success) {
        return Result.failed(new AppError(response.data.status))
      }

      return Result.success(startAppInstallationResponse.data)
    }

    return Result.failed(new AppError(response.error.type))
  }

  @IpcEvent(AppInstallationServiceEvents.GetAppInstallationProgress)
  public async getAppInstallationProgress({
    installationId,
    deviceId,
  }: {
    installationId: number
    deviceId: DeviceId
  }): Promise<ResultObject<GetAppInstallationProgress>> {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "APP_INSTALL",
      method: "GET",
      body: {
        installationId,
      },
    })

    if (response.ok) {
      const startAppInstallationResponse =
        GetAppInstallationProgressValidator.safeParse(response.data.body)

      const success = startAppInstallationResponse.success

      if (!success) {
        return Result.failed(new AppError(response.data.status))
      }

      return Result.success(startAppInstallationResponse.data)
    }

    return Result.failed(new AppError(response.error.type))
  }
}
