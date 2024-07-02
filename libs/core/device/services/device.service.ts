/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { PhoneLockCategory } from "Core/device/constants"
import { DeviceCommunicationError, Endpoint, Method } from "core-device/models"
import { PhoneLockTime } from "Core/device/dto"
import { GetPhoneLockTimeResponseBody } from "Core/device/types/mudita-os"
import { DeviceProtocol } from "device-protocol/feature"
import { DeviceId } from "Core/device/constants/device-id"

export class DeviceService {
  constructor(private deviceProtocol: DeviceProtocol) {}

  public async unlock(
    code: string,
    deviceId: DeviceId = this.deviceProtocol.device.id
  ): Promise<ResultObject<boolean>> {
    const response = await this.deviceProtocol.request(deviceId, {
      endpoint: Endpoint.Security,
      method: Method.Put,
      body: {
        phoneLockCode: code,
      },
    })

    return Result.success(response.ok)
  }

  public async unlockStatus(
    deviceId: DeviceId = this.deviceProtocol.device.id
  ): Promise<ResultObject<unknown, DeviceCommunicationError>> {
    return this.deviceProtocol.request(deviceId, {
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })
  }

  public async unlockTime(
    deviceId: DeviceId = this.deviceProtocol.device.id
  ): Promise<ResultObject<PhoneLockTime>> {
    return this.deviceProtocol.request<GetPhoneLockTimeResponseBody>(deviceId, {
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Time },
    })
  }
}
