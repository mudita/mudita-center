/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  HarmonyDirectory,
  Harmony,
  HarmonyEndpointNamed,
  HarmonyMethodNamed,
} from "devices/harmony/models"
import { HarmonySerialPort } from "devices/harmony/adapters"

export const getHarmonyFileList = async (
  directory: HarmonyDirectory,
  device: Harmony
) => {
  const response = await HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.FileSystem,
    method: HarmonyMethodNamed.Get,
    body: {
      listDir: directory,
    },
  })

  return response
}
