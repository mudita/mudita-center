/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const TooltipPlacementEnum = z.enum(["bottom-right", "bottom-left"]);

export type TooltipPlacement = z.infer<typeof TooltipPlacementEnum>;

const tooltipSchema = z.object({
  contentText: z.string().optional(),
  contentList: z.array(z.string()).optional(),
  placement: TooltipPlacementEnum.optional(),
})

export const extraConfigSchema = z.object({
  tooltip: tooltipSchema.optional(),
})

export type ExtraConfig = z.infer<typeof extraConfigSchema>