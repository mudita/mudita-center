/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  HarmonyMsc,
  HarmonyMscEndpointNamed,
  HarmonyMscMethodNamed,
} from "devices/harmony-msc/models"
import { HarmonyMscSerialPort } from "devices/harmony-msc/adapters"

export const flashHarmonyMsc = async (
  device: HarmonyMsc,
  body: { imagePath: string; scriptPath: string }
) => {
  return await HarmonyMscSerialPort.request(device, {
    endpoint: HarmonyMscEndpointNamed.Flash,
    method: HarmonyMscMethodNamed.Post,
    options: {
      timeout: 200_000,
    },
    body,
  })
}
