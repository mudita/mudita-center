/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const PreBackupValidator200 = (features: string[]) => {
  const featuresValidator = features.reduce((acc, key) => {
    return {
      ...acc,
      [key]: z.string().min(1),
    }
  }, {} as Record<string, z.ZodString>)

  return z.object({
    backupId: z.number().min(1),
    features: z.object(featuresValidator),
  })
}
export const PreBackupValidator202 = (features: string[]) => {
  const featuresValidator = features.reduce((acc, key) => {
    return {
      ...acc,
      [key]: z.string().min(1),
    }
  }, {} as Record<string, z.ZodString>)

  return z.object({
    backupId: z.number().min(1),
    features: z.object(featuresValidator).optional(),
  })
}

export type PreBackup = z.infer<ReturnType<typeof PreBackupValidator202>>
