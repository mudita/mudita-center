/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  noBackupLabel: z.string().optional(),
  backupAvailableLabel: z.string().optional(),
}).optional()

export type LastBackupDateConfig = z.infer<typeof configValidator>

export const lastBackupDate = {
  key: "last-backup-date",
  dataValidator,
  configValidator,
} as const
