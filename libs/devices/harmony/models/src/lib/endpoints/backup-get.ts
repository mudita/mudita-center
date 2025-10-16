/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { BackupCategory, BackupState } from "./backup"

export const HarmonyGetBackupRequestValidator = z.object({
  id: z.string(),
  category: z.enum([BackupCategory.Sync, BackupCategory.Backup]),
})

export const HarmonyGetBackupResponseValidator = z.object({
  state: z.enum([BackupState.Running, BackupState.Error, BackupState.Finished]),
})
