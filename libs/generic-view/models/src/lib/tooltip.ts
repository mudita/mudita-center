/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const tooltipPlacementSchema = z.enum([
  "bottom-right",
  "bottom-left",
  "top-right",
  "top-left",
])

const tooltipStrategySchema = z.enum([
  "element-oriented",
  "cursor",
  "cursor-horizontal",
])

const tooltipOffsetSchema = z.object({
  x: z.number(),
  y: z.number(),
})

const configValidator = z
  .object({
    placement: tooltipPlacementSchema.optional(),
    strategy: tooltipStrategySchema.optional(),
    offset: tooltipOffsetSchema.optional(),
  })
  .optional()

export type TooltipConfig = z.infer<typeof configValidator>

export const tooltip = {
  key: "tooltip",
  dataValidator,
  configValidator,
} as const
