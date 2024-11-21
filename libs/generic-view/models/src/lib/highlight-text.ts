/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  text: z.string(),
  phrase: z.string(),
})

export type HighlightTextData = z.infer<typeof dataValidator>

const configValidator = z
  .object({
    mode: z.enum(["partial"]).optional(),
    scope: z.enum(["all", "first"]).optional(),
    caseSensitive: z.boolean().optional(),
  })
  .optional()

export type HighlightTextConfig = z.infer<typeof configValidator>

export const highlightText = {
  key: "highlight-text",
  dataValidator,
  configValidator,
} as const
