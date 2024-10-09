/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  render: z.boolean(),
})
export type ConditionalRendererData = z.infer<typeof dataValidator>

const configValidator = z.undefined()

export const conditionalRenderer = {
  key: "conditional-renderer",
  dataValidator,
  configValidator,
} as const
