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
 * Synchronizes the Harmony device's time by sending the current UTC timestamp converted to seconds.
 * @param {Harmony} device - The Harmony device instance.
 */
export const synchronizeHarmonyTime = (device: Harmony) => {
  const currentTime = Date.now()
  const timezoneOffset = new Date().getTimezoneOffset() * 60_000
  const timestamp = Math.round((currentTime - timezoneOffset) / 1_000)

  return HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.TimeSynchronization,
    method: HarmonyMethodNamed.Post,
    body: {
      timestamp,
    },
  })
}
