/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export type DataTransferDomain = "contacts-v1" | "callLog-v1"

export const PreDataTransferValidator = (domains: DataTransferDomain[]) => {
  const featuresValidator = domains.reduce((acc, key) => {
    return {
      ...acc,
      [key]: z.string().min(1),
    }
  }, {} as Record<DataTransferDomain, z.ZodString>)

  return z.object({
    dataTransferId: z.number().min(1),
    domains: z.object(featuresValidator),
  })
}

export type PreDataTransfer = z.infer<
  ReturnType<typeof PreDataTransferValidator>
>

export const DataTransferValidator200 = z.object({
  rebootRequired: z.boolean(),
  message: z.string().min(1).optional(),
  progress: z.literal(100).default(100),
})

export const DataTransferValidator202 = z.object({
  rebootRequired: z.boolean().optional(),
  message: z.string().min(1).optional(),
  progress: z.number().min(0).max(99).default(0),
})

export const DataTransferValidator = z.union([
  DataTransferValidator200,
  DataTransferValidator202,
])

export type DataTransfer = z.infer<typeof DataTransferValidator>
