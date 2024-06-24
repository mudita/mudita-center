/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { DeviceProtocol } from "device-protocol/feature"
import { Result, ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import { DeviceInfo } from "Core/device/types/mudita-os"
import {
  CaseColour,
  DeviceCommunicationError,
  Endpoint,
  Method,
} from "core-device/models"
import { DeviceCacheIdentificationService } from "../services"
import { IpcCoreDeviceEvent } from "../constants"

export interface DeviceIdentification {
  caseColour: CaseColour | undefined
  serialNumber: string | undefined
}

export class CoreDeviceController {
  constructor(
    private deviceProtocol: DeviceProtocol,
    private deviceCacheIdentificationService: DeviceCacheIdentificationService
  ) {}

  @IpcEvent(IpcCoreDeviceEvent.GetCoreDeviceIdentification)
  public async request(
    id: DeviceId
  ): Promise<ResultObject<DeviceIdentification, DeviceCommunicationError>> {
    const deviceIdentificationCached =
      await this.deviceCacheIdentificationService.getDeviceIdentification(id)
    if (deviceIdentificationCached !== undefined) {
      return Result.success(deviceIdentificationCached)
    }

    const result = await this.deviceProtocol.request<DeviceInfo>(id, {
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
      options: {
        connectionTimeOut: 5000,
      },
    })

    if (result.ok) {
      const deviceIdentification = {
        caseColour: result.data.caseColour,
        serialNumber: result.data.serialNumber,
      }
      await this.deviceCacheIdentificationService.saveDeviceIdentification(
        id,
        deviceIdentification
      )
      return Result.success(deviceIdentification)
    } else {
      return result
    }
  }
}
