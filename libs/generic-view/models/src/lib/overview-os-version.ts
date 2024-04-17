/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  version: z.string().optional(),
  text: z.string().optional(),
  badgeText: z.string().optional(),
  update: z
    .object({
      available: z.boolean().optional(),
      actionLabel: z.undefined().optional(),
      updateVersion: z.string().optional(),
      updateText: z.string().optional(),
    })
    .or(
      z.object({
        available: z.literal(true),
        actionLabel: z.string().optional(),
        updateVersion: z.string(),
        updateText: z.string(),
      })
    )
    .optional(),
})

export type OverviewOsVersionData = z.infer<typeof dataValidator>

const configValidator = z
  .object({
    versionLabel: z.string().optional(),
    showBadge: z.boolean().optional(),
  })
  .optional()

export type OverviewOsVersionConfig = z.infer<typeof configValidator>

export const overviewOsVersion = {
  key: "overview-os-version",
  dataValidator,
  configValidator,
} as const
