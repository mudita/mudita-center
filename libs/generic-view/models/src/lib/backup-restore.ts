/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const restoreFeatureValidator = z.object({
  label: z.string().min(1),
  feature: z.string().min(1),
  keys: z.array(z.string()).min(1),
})

export type RestoreFeature = z.infer<typeof restoreFeatureValidator>

const configValidator = z.object({
  features: z.array(restoreFeatureValidator),
  modalKey: z.string(),
})

export type BackupRestoreConfig = z.infer<typeof configValidator>

export const backupRestore = {
  key: "backup-restore",
  dataValidator,
  configValidator,
} as const
