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

interface Params {
  device: Harmony
  targetPath: string
}

export const removeFileFromHarmony = async ({ device, targetPath }: Params) => {
  return HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.FileSystem,
    method: HarmonyMethodNamed.Delete,
    body: {
      removeFile: targetPath,
    },
  })
}
