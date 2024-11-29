/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z
  .object({
    backgroundColor: z.enum(["white", "grey"]).optional(),
    borderTop: z.string().optional(),
    borderRight: z.string().optional(),
    borderBottom: z.string().optional(),
    borderLeft: z.string().optional(),
  })
  .optional()

export type BlockPlainConfig = z.infer<typeof configValidator>

export const blockPlain = {
  key: "block-plain",
  dataValidator,
  configValidator,
} as const
