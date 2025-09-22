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

export const deleteHarmonyFile = async (path: string, device: Harmony) => {
  const response = await HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.FileSystem,
    method: HarmonyMethodNamed.Delete,
    body: {
      removeFile: path,
    },
  })

  return response
}
