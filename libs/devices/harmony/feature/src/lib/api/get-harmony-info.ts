/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DeviceInfoResponse,
  Harmony,
  HarmonyEndpointNamed,
  HarmonyMethodNamed,
} from "devices/harmony/models"
import { HarmonySerialPort } from "devices/harmony/adapters"

export const getHarmonyInfo = async (device: Harmony) => {
  const response = await HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.DeviceInfo,
    method: HarmonyMethodNamed.Get,
    options: {
      timeout: 2000,
      retries: 3,
    },
    body: undefined,
  })

  return {
    ...response,
    body: response.body as DeviceInfoResponse | unknown,
  }
}
