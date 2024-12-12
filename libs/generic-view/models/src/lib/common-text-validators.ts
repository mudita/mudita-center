/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { color } from "../../../theme/src/lib/color"

const singleLineTextValidator = z.object({
  singleLine: z.boolean().optional(),
})

const textTransformTypes = z.enum([
  "capitalize",
  "uppercase",
  "lowercase",
  "capitalize-first-letter",
  "format-bytes",
])

export type TextTransformTypes = z.infer<typeof textTransformTypes>

const textTransformOptionsValidator = z.object({
  minUnit: z.enum(["B", "KB", "MB", "GB", "TB"]).optional(),
})

export type TextTransformOptions = z.infer<typeof textTransformOptionsValidator>

const textTransformValidator = z.object({
  textTransform: textTransformTypes.optional(),
  textTransformOptions: textTransformOptionsValidator.optional(),
})

const colorValidator = z.object({
  color: z
    .enum(Object.keys(color) as [keyof typeof color, ...(keyof typeof color)[]])
    .optional(),
})

const textAlignValidator = z.object({
  textAlign: z
    .enum(["left", "right", "center", "justify", "start", "end"])
    .optional(),
})

export const commonTextValidators = singleLineTextValidator
  .merge(textTransformValidator)
  .merge(colorValidator)
  .merge(textAlignValidator)

export type CommonTextValidators = z.infer<typeof commonTextValidators>
