/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z
  .object({
    buttonLabel: z.string().optional(),
  })
  .optional()

export type BackupRestoreAvailableConfig = z.infer<typeof configValidator>

export const backupRestoreAvailable = {
  key: "backup-restore-available",
  dataValidator,
  configValidator,
} as const
