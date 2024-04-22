/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  value: z.number(),
  message: z.string().optional(),
})

export type ProgressBarData = z.infer<typeof dataValidator>

const configValidator = z.object({
  maxValue: z.number(),
  valueUnit: z.string().optional(),
})

export type ProgressBarConfig = z.infer<typeof configValidator>

export const progressBar = {
  key: "progress-bar",
  dataValidator,
  configValidator,
} as const
