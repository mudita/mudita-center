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
 * Fetches the current time from the Harmony device, converts it to milliseconds and adjusts for the local timezone offset.
 * @param {Harmony} device - The Harmony device instance.
 */
export const getHarmonyTime = async (device: Harmony) => {
  const response = await HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.TimeSynchronization,
    method: HarmonyMethodNamed.Get,
    body: {
      value: "timestamp",
    },
  })

  if (response.ok) {
    const originalTimestamp = response.body.timestamp * 1000
    const timezoneOffset = new Date().getTimezoneOffset() * 60_000

    response.body.timestamp = originalTimestamp + timezoneOffset
  }
  return response
}
