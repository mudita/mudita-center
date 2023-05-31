/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PhoneNumber } from "App/phone-numbers/dto"
import { DeviceManager } from "App/device-manager/services"
import { GetPhoneNumberResponseBody } from "App/device/types/mudita-os"
import { Endpoint, Method } from "App/device/constants"
import { RequestResponse, RequestResponseStatus } from "App/core/types/request-response.interface"
import { PhoneNumberRepository } from "App/phone-numbers/repositories"

export class PhoneNumberService {
  constructor(
    private deviceManager: DeviceManager,
    private phoneNumberRepository: PhoneNumberRepository,
  ) {
  }

  public async getPhoneNumber(
    id: string,
  ): Promise<RequestResponse<PhoneNumber> | undefined> {
    return await this.getPhoneNumberRequest(id)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // the method is commented until os part will be implemented as CP-1232
  private async getPhoneNumberRequest(
    id: string,
  ): Promise<RequestResponse<PhoneNumber> | undefined> {
    const response =
      await this.deviceManager.device.request<GetPhoneNumberResponseBody>({
        endpoint: Endpoint.PhoneNumber,
        method: Method.Get,
        body: {
          numberID: Number(id),
        },
      })

    if (response.ok && response.data) {
      return {
        status: RequestResponseStatus.Ok,
        data: response.data,
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Get phone number: Something went wrong" },
      }
    }
  }
}
