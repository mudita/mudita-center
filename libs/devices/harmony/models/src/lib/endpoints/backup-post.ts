/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { BackupCategory } from "./backup"

export const HarmonyPostBackupRequestValidator = z.object({
  category: z.enum([BackupCategory.Sync, BackupCategory.Backup]),
})

export const HarmonyPostBackupResponseValidator = z.object({
  id: z.string().optional(),
})
