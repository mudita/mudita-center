/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  text: z.string(),
})

export type ParagraphConfig = z.infer<typeof configValidator>

export const P1Component = {
  key: "p1-component",
  dataValidator,
  configValidator,
} as const

// Add more paragraphs here
