/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject, Result } from "Core/core/builder"
import {
  DeviceCommunicationError,
  Endpoint,
  Method,
  PhoneLockCategory,
} from "Core/device/constants"
import { PhoneLockTime } from "Core/device/dto"
import { GetPhoneLockTimeResponseBody } from "Core/device/types/mudita-os"
import { DeviceManager } from "Core/device-manager/services"

export class DeviceService {
  constructor(private deviceManager: DeviceManager) {}

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
}
