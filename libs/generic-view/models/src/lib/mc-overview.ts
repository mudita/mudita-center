/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z
  .object({
    text: z.string().optional(),
  })
  .optional()

export type McOverviewData = z.infer<typeof dataValidator>

const configValidator = z.object({
  title: z.string(),
})

export type McOverviewConfig = z.infer<typeof configValidator>

export const mcOverview = {
  key: "mc-overview",
  dataValidator,
  configValidator,
} as const
