/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceManager } from "Core/device-manager/services"
import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import {
  APIFeaturesServiceEvents,
  OverviewConfig,
  OverviewData,
} from "device/models"
import { GeneralError } from "../general-error"
import { AppError } from "Core/core/errors"
import { DeviceId } from "Core/device/constants/device-id"

export class APIFeaturesService {
  constructor(private deviceManager: DeviceManager) {}

  @IpcEvent(APIFeaturesServiceEvents.FeatureConfiguration)
  public async getFeatureConfiguration(
    feature: string
  ): Promise<ResultObject<unknown>> {
    const device = this.deviceManager.apiDevice
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
      return Result.success(response.data.body)
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
      return Result.success(response.data.body as OverviewConfig)
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
  public async getOverviewData(
    deviceId?: DeviceId
  ): Promise<ResultObject<OverviewData>> {
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
      return Result.success(response.data.body as OverviewData)
    }

    return Result.failed(response.error)
  }
}
