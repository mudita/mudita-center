/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { color } from "../../../theme/src/lib/color"

const singleLineTextValidator = z.object({
  singleLine: z.boolean().optional(),
})

const textTransformValidator = z.object({
  textTransform: z
    .enum(["capitalize", "uppercase", "lowercase", "capitalize-first-letter"])
    .optional(),
})

const colorValidator = z.object({
  color: z
    .enum(Object.keys(color) as [keyof typeof color, ...(keyof typeof color)[]])
    .optional(),
})

export const commonTextValidators = singleLineTextValidator
  .merge(textTransformValidator)
  .merge(colorValidator)

export type CommonTextValidators = z.infer<typeof commonTextValidators>
