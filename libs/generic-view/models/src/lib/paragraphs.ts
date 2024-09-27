/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  text: z.string(),
}).optional()

export type ParagraphConfig = z.infer<typeof configValidator>

export const p1Component = {
  key: "p1-component",
  dataValidator,
  configValidator,
} as const

export const p2Component = {
  key: "p2-component",
  dataValidator,
  configValidator,
} as const

export const p3Component = {
  key: "p3-component",
  dataValidator,
  configValidator,
} as const

export const p4Component = {
  key: "p4-component",
  dataValidator,
  configValidator,
} as const
