/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const TooltipPlaceEnum = z.enum(["bottom-right", "bottom-left"]);

export type TooltipPlace = z.infer<typeof TooltipPlaceEnum>;

const tooltipSchema = z.object({
  contentText: z.string().optional(),
  contentList: z.array(z.string()).optional(),
  place: TooltipPlaceEnum.optional(),
})

export const extraConfigSchema = z.object({
  tooltip: tooltipSchema.optional(),
})

export type ExtraConfig = z.infer<typeof extraConfigSchema>
