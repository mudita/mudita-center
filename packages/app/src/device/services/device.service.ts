/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject, Result } from "App/core/builder"
import {
  DeviceCommunicationError,
  Endpoint,
  Method,
  PhoneLockCategory,
} from "App/device/constants"
import { PhoneLockTime } from "App/device/dto"
import {
  DeviceInfo,
  GetPhoneLockTimeResponseBody,
} from "App/device/types/mudita-os"
import { DeviceManager } from "App/device-manager/services"

export class DeviceService {
  constructor(private deviceManager: DeviceManager) {}

  public async connect(): Promise<ResultObject<DeviceInfo>> {
    console.log("DeviceService connect")
    return this.deviceManager.device.connect()
  }

  public async disconnect(): Promise<ResultObject<boolean>> {
    console.log("DeviceService disconnect")
    return this.deviceManager.device.disconnect()
  }

  public async unlock(code: string): Promise<ResultObject<boolean>> {
    const response = await this.deviceManager.device.request({
      endpoint: Endpoint.Security,
      method: Method.Put,
      body: {
        phoneLockCode: code,
      },
    })

    return Result.success(response.ok)
  }

  public async unlockStatus(): Promise<
    ResultObject<unknown, DeviceCommunicationError>
  > {
    return this.deviceManager.device.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })
  }

  public async unlockTime(): Promise<ResultObject<PhoneLockTime>> {
    return this.deviceManager.device.request<GetPhoneLockTimeResponseBody>({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Time },
    })
  }

  public setUpdating(updating: boolean): void {
    this.deviceManager.updating = updating
  }
}
