/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z
  .object({
    animationDuration: z.number().nonnegative().optional(),
    visibilityDuration: z.number().nonnegative().optional(),
  })
  .optional()

export type ToastConfig = z.infer<typeof configValidator>

export const toast = {
  key: "toast",
  dataValidator,
  configValidator,
} as const
