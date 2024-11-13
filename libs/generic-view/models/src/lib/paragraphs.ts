/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { color } from "../../../theme/src/lib/color"

const dataValidator = z.undefined()

const configValidator = z
  .object({
    text: z.string().optional(),
    color: z
      .enum(
        Object.keys(color) as [keyof typeof color, ...(keyof typeof color)[]]
      )
      .optional(),
    textTransform: z
      .enum(["capitalize", "uppercase", "lowercase", "capitalize-first-letter"])
      .optional(),
  })
  .optional()

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

export const p5Component = {
  key: "p5-component",
  dataValidator,
  configValidator,
} as const
