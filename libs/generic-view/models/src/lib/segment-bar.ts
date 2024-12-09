/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  segments: z.array(z.number()),
})

export type SegmentBarData = z.infer<typeof dataValidator>

const segmentBarItemSchema = z.object({
  color: z.string(),
  label: z.string(),
  value: z.number(),
  minWidth: z.number(),
})

export type SegmentBarItem = z.infer<typeof segmentBarItemSchema>

const configValidator = z.object({
  segments: z.array(segmentBarItemSchema),
  segmentBorderRadius: z.string().optional(),
})

export type SegmentBarConfig = z.infer<typeof configValidator>

export const segmentBar = {
  key: "segment-bar",
  dataValidator,
  configValidator,
} as const
