/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PhoneNumber } from "App/phone-numbers/dto"
import { DeviceManager } from "App/device-manager/services"
import { GetPhoneNumberResponseBody } from "App/device/types/mudita-os"
import { Endpoint, Method } from "App/device/constants"
import { PhoneNumberRepository } from "App/phone-numbers/repositories"
import { ResultObject } from "App/core/builder"

export class PhoneNumberService {
  constructor(
    private deviceManager: DeviceManager,
    private phoneNumberRepository: PhoneNumberRepository
  ) {}

  public async getPhoneNumber(id: string): Promise<ResultObject<PhoneNumber>> {
    return await this.getPhoneNumberRequest(id)
  }

  private async getPhoneNumberRequest(
    id: string
  ): Promise<ResultObject<PhoneNumber>> {
    const result =
      await this.deviceManager.device.request<GetPhoneNumberResponseBody>({
        endpoint: Endpoint.PhoneNumber,
        method: Method.Get,
        body: {
          numberID: Number(id),
        },
      })

    if (!result.ok) {
      return result
    }

    const phoneNumber = {
      number: result.data.number,
      id: String(result.data.numberID),
    }

    this.phoneNumberRepository.update(phoneNumber)

    return {
      ...result,
      data: phoneNumber,
    }
  }
}
