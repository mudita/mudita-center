/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const blockBoxDataValidator = z.object({
  badgeText: z.string().optional(),
}).optional()

export type BlockBoxData = z.infer<typeof blockBoxDataValidator>

const blockBoxConfigValidator = z.object({
  title: z.string().optional(),
}).optional()

export type BlockBoxConfig = z.infer<typeof blockBoxConfigValidator>

export const blockBox = {
  key: "block-box",
  dataValidator: blockBoxDataValidator,
  configValidator: blockBoxConfigValidator,
} as const
