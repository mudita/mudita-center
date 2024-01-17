/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { DeviceManager } from "Core/device-manager/services"
import { IpcDeviceManagerEvent } from "Core/device-manager/constants"
import { Result, ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import {
  CaseColor,
  DeviceCommunicationError,
  Endpoint,
  Method,
} from "Core/device"
import { DeviceInfo } from "Core/device/types/mudita-os"
import { DeviceCacheConfigurationService } from "Core/device-manager/services/device-cache-configuration.service"

export interface DeviceConfiguration {
  caseColour: CaseColor | undefined
}

export class DeviceManagerController {
  constructor(
    private deviceManager: DeviceManager,
    private deviceCacheConfigurationService: DeviceCacheConfigurationService
  ) {}

  @IpcEvent(IpcDeviceManagerEvent.SetActiveDevice)
  public setActiveDevice(id: DeviceId | undefined): ResultObject<boolean> {
    return this.deviceManager.setActiveDevice(id)
  }

  @IpcEvent(IpcDeviceManagerEvent.GetDeviceConfiguration)
  public async request(
    id: DeviceId
  ): Promise<ResultObject<DeviceConfiguration, DeviceCommunicationError>> {
    const deviceConfigurationCached =
      await this.deviceCacheConfigurationService.getDeviceConfiguration(id)
    if (deviceConfigurationCached !== undefined) {
      return Result.success(deviceConfigurationCached)
    }

    const result = await this.deviceManager.request<DeviceInfo>(id, {
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (result.ok) {
      const deviceConfiguration = { caseColour: result.data.caseColour }
      await this.deviceCacheConfigurationService.saveDeviceConfiguration(
        id,
        deviceConfiguration
      )
      return Result.success(deviceConfiguration)
    } else {
      return result
    }
  }
}
