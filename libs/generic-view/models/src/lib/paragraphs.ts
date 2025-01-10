/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { commonTextValidators } from "./common-text-validators"

const dataValidator = z.object({
  text: z.string().optional(),
})
export type ParagraphData = z.infer<typeof dataValidator>

const configValidator = z
  .object({
    text: z.string().optional(),
  })
  .merge(commonTextValidators)
  .optional()

export type ParagraphConfig = z.infer<typeof configValidator>

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


export const p5Component = {
  key: "p5-component",
  dataValidator,
  configValidator,
} as const
