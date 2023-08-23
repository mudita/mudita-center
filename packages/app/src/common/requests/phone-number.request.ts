/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GetPhoneNumberResponseBody,
  PhoneNumbersResponse,
} from "App/device/types/mudita-os"
import { Endpoint, Method } from "App/device/constants"
import { DeviceManager } from "App/device-manager/services"

export const getPhoneNumbersRequest = async (
  deviceManager: DeviceManager,
  phoneNumberIds: string[]
): Promise<PhoneNumbersResponse> => {
  const phoneNumberIdsNumbers = phoneNumberIds.map((phoneNumberId) =>
    Number(phoneNumberId)
  )
  const phoneNumberResponse =
    await deviceManager.device.request<GetPhoneNumberResponseBody>({
      endpoint: Endpoint.PhoneNumber,
      method: Method.Get,
      body: {
        numberIDs: phoneNumberIdsNumbers,
      },
    })

  return phoneNumberResponse.data as PhoneNumbersResponse
}
