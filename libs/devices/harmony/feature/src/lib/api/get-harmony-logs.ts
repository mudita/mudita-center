/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Harmony,
  HarmonyEndpointNamed,
  HarmonyLogsRequest,
  HarmonyLogsResponse,
  HarmonyMethodNamed,
} from "devices/harmony/models"
import { HarmonySerialPort } from "devices/harmony/adapters"

export const getHarmonyLogs = async (
  device: Harmony,
  body: HarmonyLogsRequest
) => {
  const response = await HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.DeviceInfo,
    method: HarmonyMethodNamed.Get,
    options: {
      timeout: 5000,
    },
    body,
  })

  return {
    ...response,
    body: response.body as HarmonyLogsResponse | unknown,
  }
}
