/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const PreRestoreValidator = (features: string[]) => {
  const featuresValidator = features.reduce((acc, key) => {
    return {
      ...acc,
      [key]: z.string().min(1),
    }
  }, {} as Record<string, z.ZodString>)

  return z.object({
    restoreId: z.number().min(1),
    features: z.object(featuresValidator),
  })
}

export type PreRestore = z.infer<ReturnType<typeof PreRestoreValidator>>

export const RestoreValidator200 = z.object({
  rebootRequired: z.boolean(),
  message: z.string().min(1).optional(),
  progress: z.literal(100).default(100),
})

export const RestoreValidator202 = z.object({
  rebootRequired: z.boolean().optional(),
  message: z.string().min(1).optional(),
  progress: z.number().min(0).max(99).default(0),
})

export const RestoreValidator = z.union([
  RestoreValidator200,
  RestoreValidator202,
])

export type Restore = z.infer<typeof RestoreValidator>

export const RestoreMetadataValidator = z.object({
  header: z.object({
    vendorId: z.string().min(1),
    productId: z.string().min(1),
    serialNumber: z.string().min(1),
    appVersion: z.string().min(1),
    password: z.string().min(1).optional(),
    crypto: z.literal("AES").optional(),
  }),
  features: z.array(z.string().min(1)),
})

export type RestoreMetadata = z.infer<typeof RestoreMetadataValidator>
