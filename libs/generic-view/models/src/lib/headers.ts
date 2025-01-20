/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { commonTextValidators } from "./common-text-validators"

const dataValidator = z.undefined()

const unboldValidator = z.object({
  unbold: z.boolean().optional(),
})

export type UnboldValidator = z.infer<typeof unboldValidator>

const configValidator = z
  .object({
    text: z.string().optional(),
  })
  .merge(commonTextValidators)
  .merge(unboldValidator)
  .optional()

export type HeaderConfig = z.infer<typeof configValidator>

export const h3Component = {
  key: "h3-component",
  dataValidator,
  configValidator,
} as const

export const h4Component = {
  key: "h4-component",
  dataValidator,
  configValidator,
} as const

export const h5Component = {
  key: "h5-component",
  dataValidator,
  configValidator,
} as const
