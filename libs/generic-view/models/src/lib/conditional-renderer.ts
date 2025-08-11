/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  render: z.boolean().or(z.array(z.boolean())),
})
export type ConditionalRendererData = z.infer<typeof dataValidator>

const configValidator = z
  .object({
    multipleConditionsMethod: z.enum(["and", "or"]).optional(),
  })
  .optional()

export type ConditionalRendererConfig = z.infer<typeof configValidator>

export const conditionalRenderer = {
  key: "conditional-renderer",
  dataValidator,
  configValidator,
} as const
