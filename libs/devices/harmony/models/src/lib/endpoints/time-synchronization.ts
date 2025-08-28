/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const HarmonySynchronizeTimeRequestValidator = z.object({
  timestamp: z.number().int().positive(),
})

export const HarmonySynchronizeTimeResponseValidator = z.undefined().optional()

export const HarmonyGetTimeRequestValidator = z.object({
  value: z.literal("timestamp"),
})

export const HarmonyGetTimeResponseValidator = z.object({
  timestamp: z.number().int().positive(),
})
