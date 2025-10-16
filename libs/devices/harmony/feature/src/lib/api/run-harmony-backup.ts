/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  BackupCategory,
  Harmony,
  HarmonyEndpointNamed,
  HarmonyMethodNamed,
} from "devices/harmony/models"
import { HarmonySerialPort } from "devices/harmony/adapters"

interface Params {
  device: Harmony
  category?: BackupCategory
}

export const runHarmonyBackup = async ({
  device,
  category = BackupCategory.Sync,
}: Params) => {
  return HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.Backup,
    method: HarmonyMethodNamed.Post,
    body: {
      category,
    },
  })
}
