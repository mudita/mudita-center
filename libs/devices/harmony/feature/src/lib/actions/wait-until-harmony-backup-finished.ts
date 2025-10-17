/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { delay } from "app-utils/common"
import {
  BackupState,
  Harmony,
  HarmonyEndpointNamed,
  HarmonyMethodNamed,
} from "devices/harmony/models"
import { OKResponse } from "devices/harmony/adapters"
import { getHarmonyBackupStatus } from "../api/get-harmony-backup-status"

const MAX_BACKUP_ITERATIONS = 20

export const waitUntilHarmonyBackupFinished = async (
  device: Harmony,
  id: string,
  delayMs = 100,
  iteration = 0
): Promise<OKResponse<HarmonyEndpointNamed.Backup, HarmonyMethodNamed.Get>> => {
  const response = await getHarmonyBackupStatus({ device, id })

  if (!response.ok || response.body?.state === BackupState.Error) {
    throw new Error(`Error getting backup status: ${response.status}`)
  } else if (response.body?.state === BackupState.Finished) {
    return response
  } else if (iteration === MAX_BACKUP_ITERATIONS) {
    throw new Error("Timeout waiting for backup to finish")
  } else {
    await delay(delayMs)
    return waitUntilHarmonyBackupFinished(device, id, delayMs, iteration + 1)
  }
}
