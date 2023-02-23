/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { DeviceInfo } from "App/device-info/dto"
import { DeviceInfoPresenter } from "App/device-info/presenters"
import { DeviceManager } from "App/device-manager/services"
import {
  DeviceCommunicationError,
  Endpoint,
  Method,
} from "App/device/constants"
import {
  DeviceInfo as DeviceInfoRaw,
  NotSupportedDeviceInfo,
} from "App/device/types/mudita-os"

export class DeviceInfoService {
  constructor(private deviceManager: DeviceManager) {}

  private async getDeviceInfoRequest<TResult>(): Promise<
    ResultObject<TResult, DeviceCommunicationError>
  > {
    return this.deviceManager.device.request<TResult>({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })
  }

  public async getDeviceInfo(): Promise<ResultObject<DeviceInfo, string>> {
    try {
      const response = await this.getDeviceInfoRequest<DeviceInfoRaw>()

      if (!response.ok) {
        return response
      }

      return Result.success(DeviceInfoPresenter.toDto(response.data))
    } catch (error) {
      return Result.failed(new AppError("", ""))
    }
  }

  public async getDeviceFreeSpace(): Promise<ResultObject<number, string>> {
    try {
      const response = await this.getDeviceInfoRequest<
        DeviceInfoRaw | NotSupportedDeviceInfo
      >()

      if (!response.ok) {
        return response
      }

      const freeSpaceInNoTSupportedDevice = Number(
        (response.data as NotSupportedDeviceInfo).fsFree
      )

      if (!isNaN(freeSpaceInNoTSupportedDevice)) {
        return Result.success(freeSpaceInNoTSupportedDevice)
      }

      const { deviceSpaceTotal, usedUserSpace, systemReservedSpace } =
        response.data as DeviceInfoRaw

      const freeSpace =
        Number(deviceSpaceTotal) -
        Number(usedUserSpace) -
        Number(systemReservedSpace)

      return Result.success(freeSpace)
    } catch (error) {
      return Result.failed(new AppError("", ""))
    }
  }
}
