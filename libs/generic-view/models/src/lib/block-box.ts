/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z
  .object({
    badgeText: z.string().optional(),
  })
  .optional()

export type BlockBoxData = z.infer<typeof dataValidator>

const configValidator = z
  .object({
    title: z.string().optional(),
  })
  .optional()

export type BlockBoxConfig = z.infer<typeof configValidator>

export const blockBox = {
  key: "block-box",
  dataValidator,
  configValidator,
} as const
