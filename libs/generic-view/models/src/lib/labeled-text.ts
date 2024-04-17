/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  text: z.string(),
})

export type LabeledTextData = z.infer<typeof dataValidator>

const configValidator = z.object({
  label: z.string(),
  direction: z.enum(["row", "column"]),
})

export type LabeledTextConfig = z.infer<typeof configValidator>

export const labeledText = {
  key: "labeled-text",
  dataValidator,
  configValidator,
} as const
