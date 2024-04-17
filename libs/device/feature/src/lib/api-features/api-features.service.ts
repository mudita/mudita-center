/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceManager } from "Core/device-manager/services"
import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import {
  APIFeaturesServiceEvents,
  FeatureConfigValidator,
  GeneralError,
  OverviewConfig,
  OverviewConfigValidator,
  OverviewData,
  OverviewDataValidator,
} from "device/models"
import { AppError } from "Core/core/errors"
import { DeviceId } from "Core/device/constants/device-id"
import { View } from "generic-view/utils"

export class APIFeaturesService {
  constructor(private deviceManager: DeviceManager) {}

  @IpcEvent(APIFeaturesServiceEvents.FeatureConfiguration)
  public async getFeatureConfiguration({
    feature,
    deviceId,
  }: {
    feature: string
    deviceId?: DeviceId
  }): Promise<ResultObject<unknown>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "FEATURE_CONFIGURATION",
      method: "GET",
      body: {
        feature,
        lang: "en-US",
      },
    })
    if (response.ok) {
      const config = FeatureConfigValidator.safeParse(response.data.body)
      if (process.env.NODE_ENV === "development" && !config.success) {
        console.log(JSON.stringify(config, null, 2))
      }
      return config.success
        ? Result.success(config.data)
        : Result.failed(new AppError(GeneralError.IncorrectResponse))
    }

    return Result.failed(response.error)
  }

  @IpcEvent(APIFeaturesServiceEvents.GetOverviewConfiguration)
  public async getOverviewFeatureConfiguration(
    deviceId?: DeviceId
  ): Promise<ResultObject<OverviewConfig>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "FEATURE_CONFIGURATION",
      method: "GET",
      body: {
        feature: "mc-overview",
        lang: "en-US",
      },
    })

    if (response.ok) {
      const config = OverviewConfigValidator.safeParse(response.data.body)

      return config.success
        ? Result.success(config.data)
        : Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }

    return Result.failed(response.error)
  }

  @IpcEvent(APIFeaturesServiceEvents.FeatureData)
  public async getFeatureData(feature: string): Promise<ResultObject<unknown>> {
    const device = this.deviceManager.apiDevice
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "FEATURE_DATA",
      method: "GET",
      body: {
        feature,
        lang: "en-US",
      },
    })
    if (response.ok) {
      return Result.success(response.data.body)
    }

    return Result.failed(response.error)
  }

  @IpcEvent(APIFeaturesServiceEvents.GetOverviewData)
  public async getOverviewData({
    deviceId,
    overview,
    about,
  }: {
    deviceId?: DeviceId
    overview: View
    about: View
  }): Promise<ResultObject<OverviewData>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "FEATURE_DATA",
      method: "GET",
      body: {
        feature: "mc-overview",
        lang: "en-US",
      },
    })
    if (response.ok) {
      const validator = OverviewDataValidator(overview, about)

      const overviewData = validator.safeParse(response.data.body)

      return overviewData.success
        ? Result.success(overviewData.data)
        : Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }

    return Result.failed(response.error)
  }
}
