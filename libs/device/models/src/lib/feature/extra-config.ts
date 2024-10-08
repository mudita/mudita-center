/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const TooltipPlacementEnum = z.enum([
  "bottom-right",
  "bottom-left",
  "top-right",
  "top-left",
])

export type TooltipPlacement = z.infer<typeof TooltipPlacementEnum>

const TooltipOffset = z.object({
  x: z.number(),
  y: z.number(),
})

export type TooltipOffsetType = z.infer<typeof TooltipOffset>

const tooltipSchema = z.object({
  contentText: z.string().optional(),
  contentList: z.array(z.string()).optional(),
  placement: TooltipPlacementEnum.optional(),
  offset: TooltipOffset.optional(),
})

export const extraConfigSchema = z.object({
  tooltip: tooltipSchema.optional(),
})

export type ExtraConfig = z.infer<typeof extraConfigSchema>
