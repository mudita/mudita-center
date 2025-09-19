/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Harmony,
  HarmonyEndpointNamed,
  HarmonyMethodNamed,
} from "devices/harmony/models"
import { HarmonySerialPort } from "devices/harmony/adapters"

/**
 * Triggers a firmware update and reboots the Harmony device.
 * @param {Harmony} device - The Harmony device instance.
 */
export const updateHarmony = (device: Harmony) => {
  return HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.Update,
    method: HarmonyMethodNamed.Post,
    body: {
      update: true,
      reboot: true,
    },
    options: {
      timeout: 120_000, // 2 minutes
    },
  })
}
