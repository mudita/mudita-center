/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const backupFeatureValidator = z.object({
  label: z.string(),
  key: z.string(),
})

export type BackupFeature = z.infer<typeof backupFeatureValidator>

const configValidator = z
  .object({
    features: z.array(backupFeatureValidator).optional(),
    modalKey: z.string().optional(),
  })
  .optional()

export type BackupCreateConfig = z.infer<typeof configValidator>

export const backupCreate = {
  key: "backup-create",
  dataValidator,
  configValidator,
} as const
