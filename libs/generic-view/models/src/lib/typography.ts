/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { commonTextValidators } from "./common-text-validators"

const dataValidator = z.object({
  text: z.string().optional(),
})
export type TypographyData = z.infer<typeof dataValidator>

const configValidator = z
  .object({
    text: z.string().optional(),
  })
  .merge(commonTextValidators)
  .optional()

export type TypographyConfig = z.infer<typeof configValidator>

export const typographyKeys = [
  "typography.h3",
  "typography.h4",
  "typography.h5",
  "typography.p1",
  "typography.p2",
  "typography.p3",
  "typography.p4",
  "typography.p5",
] as const

export type TypographyKey = (typeof typographyKeys)[number]

export const TypographyMap = typographyKeys.reduce(
  (acc, key) => {
    acc[key] = {
      key,
      dataValidator,
      configValidator,
    }
    return acc
  },
  {} as Record<
    (typeof typographyKeys)[number],
    {
      key: (typeof typographyKeys)[number]
      dataValidator: typeof dataValidator
      configValidator: typeof configValidator
    }
  >
)
