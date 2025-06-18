/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Harmony,
  HarmonyEndpointNamed,
  HarmonyInfoResponse,
  HarmonyMethodNamed,
} from "devices/harmony/models"
import { HarmonySerialPort, Response } from "devices/harmony/adapters"

export const getHarmonyInfo = async (device: Harmony) => {
  const response = await HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.DeviceInfo,
    method: HarmonyMethodNamed.Get,
    options: {
      timeout: 2000,
    },
    body: undefined,
  })

  return {
    ...response,
    ...(response.ok ? { body: response.body as HarmonyInfoResponse } : {}),
  }
}

export type GetHarmonyInfoResponse = Response<
  HarmonyEndpointNamed.DeviceInfo,
  HarmonyMethodNamed.Get
>
