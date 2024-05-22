/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { DeviceInfo } from "Core/device-info/dto"
import { DeviceInfoPresenter } from "Core/device-info/presenters"
import { DeviceManager } from "Core/device-manager/services"
import {
  DeviceCommunicationError,
  Endpoint,
  Method,
} from "Core/device/constants"
import {
  DeviceInfo as DeviceInfoRaw,
  NotSupportedDeviceInfo,
} from "Core/device/types/mudita-os"

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

      return Result.success(
        DeviceInfoPresenter.toDto(
          response.data,
          this.deviceManager.device.deviceType
        )
      )
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
