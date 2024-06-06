/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { DeviceProtocolService } from "device-protocol/feature"
import { Result, ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import { DeviceInfo } from "Core/device/types/mudita-os"
import {
  CaseColour,
  DeviceCommunicationError,
  Endpoint,
  Method,
} from "core-device/models"
import { DeviceCacheConfigurationService } from "../services"
import { IpcCoreDeviceEvent } from "../constants"

export interface DeviceConfiguration {
  caseColour: CaseColour | undefined
  serialNumber: string | undefined
}

export class CoreDeviceController {
  constructor(
    private deviceManager: DeviceProtocolService,
    private deviceCacheConfigurationService: DeviceCacheConfigurationService
  ) {}

  @IpcEvent(IpcCoreDeviceEvent.GetCoreDeviceConfiguration)
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
      options: {
        connectionTimeOut: 5000,
      },
    })

    if (result.ok) {
      const deviceConfiguration = {
        caseColour: result.data.caseColour,
        serialNumber: result.data.serialNumber,
      }
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
