/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const tooltipSchema = z.object({
  contentText: z.string(),
})

export const extraConfigSchema = z.object({
  tooltip: tooltipSchema,
})

export type ExtraConfig = z.infer<typeof extraConfigSchema>
