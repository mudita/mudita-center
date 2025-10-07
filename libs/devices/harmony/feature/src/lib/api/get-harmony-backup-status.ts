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
  id: string
}

export const getHarmonyBackupStatus = async ({
  device,
  id,
  category = BackupCategory.Sync,
}: Params) => {
  return HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.Backup,
    method: HarmonyMethodNamed.Get,
    body: {
      id,
      category,
    },
  })
}
