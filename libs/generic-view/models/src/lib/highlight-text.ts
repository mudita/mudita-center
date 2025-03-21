/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  text: z.string(),
  phrase: z.string().optional(),
})

export type HighlightTextData = z.infer<typeof dataValidator>

const configValidator = z
  .object({
    scope: z.enum(["all", "first", "last"]).optional(),
    mode: z.enum(["anywhere", "word", "word-start", "word-end"]).optional(),
    caseSensitive: z.boolean().optional(),
    phraseWordsSeparated: z.boolean().optional(),
  })
  .optional()

export type HighlightTextConfig = z.infer<typeof configValidator>

export const highlightText = {
  key: "highlight-text",
  dataValidator,
  configValidator,
} as const
