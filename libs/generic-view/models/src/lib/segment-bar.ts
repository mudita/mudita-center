/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  segments: z.array(z.number().nonnegative()),
})

export type SegmentBarData = z.infer<typeof dataValidator>

const segmentBarItemSchema = z.object({
  color: z.string(),
  label: z.string(),
  value: z.number().nonnegative(),
  minWidth: z.number().nonnegative(),
})

export type SegmentBarItem = z.infer<typeof segmentBarItemSchema>

const configValidator = z.object({
  segments: z.array(segmentBarItemSchema),
})

export type SegmentBarConfig = z.infer<typeof configValidator>

export const segmentBar = {
  key: "segment-bar",
  dataValidator,
  configValidator,
} as const
