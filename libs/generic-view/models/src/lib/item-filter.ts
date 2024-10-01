/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({})

export type ItemFilterData = z.infer<typeof dataValidator>

const configValidator = z
  .object({
    variant: z.enum(["FirstNonEmpty"]).optional(),
    slice: z.tuple([z.number(), z.number()]).optional(),
  })
  .refine(
    (data) => {
      if (!data.variant) {
        return data.slice !== undefined
      }
      return true
    },
    {
      message: "Slice is required when variant is not provided",
      path: ["slice"],
    }
  )

export type ItemFilterConfig = z.infer<typeof configValidator>

export const itemFilter = {
  key: "item-filter",
  dataValidator,
  configValidator,
} as const
