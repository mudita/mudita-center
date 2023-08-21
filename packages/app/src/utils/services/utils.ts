/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GetPhoneNumberResponseBody,
  PhoneNumberResponse,
} from "App/device/types/mudita-os"
import { Endpoint, Method } from "App/device/constants"
import { DeviceManager } from "App/device-manager/services"

export const getPhoneNumberRequest = async (
  deviceManager: DeviceManager,
  phoneNumberId: string
): Promise<PhoneNumberResponse> => {
  const phoneNumberResponse =
    await deviceManager.device.request<GetPhoneNumberResponseBody>({
      endpoint: Endpoint.PhoneNumber,
      method: Method.Get,
      body: {
        numberID: Number(phoneNumberId),
      },
    })
  return phoneNumberResponse.data as PhoneNumberResponse
}
